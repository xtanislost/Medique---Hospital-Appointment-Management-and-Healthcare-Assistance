import React, { useState, useEffect, useContext } from 'react';
import { Star, MessageCircle, Send, RefreshCw, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../context/AppContext'; // Import useAppContext

const DoctorReviews = ({ docId }) => { // Changed prop name to docId to match Appointment
    const { token: appToken, backendUrl } = useAppContext(); // Get token and backendUrl from context
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviewForm, setReviewForm] = useState({
        rating: 0,
        reviewText: '',
        isSubmitting: false,
        submissionError: null,
        submissionSuccess: false,
    });

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${backendUrl}/api/review/doctors/${docId}/reviews`); // Use docId prop
                if (!response.ok) {
                    throw new Error(`Failed to fetch reviews: ${response.status}`);
                }
                const data = await response.json();
                setReviews(data.reviews);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching reviews.');
            } finally {
                setLoading(false);
            }
        };

        if (docId) {
            fetchReviews();
        }
    }, [docId, backendUrl]); // Add docId and backendUrl as dependencies

    const handleInputChange = (e) => {
        setReviewForm({
            ...reviewForm,
            reviewText: e.target.value,
        });
    };

    const handleRatingChange = (rating) => {
        setReviewForm({
            ...reviewForm,
            rating,
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleSubmitReview = async () => {
        if (!appToken) {
            alert('Please log in to submit a review.');
            return;
        }

        if (reviewForm.rating === 0) {
            setReviewForm({
                ...reviewForm,
                submissionError: 'Please select a rating.',
            });
            return;
        }

        setReviewForm({
            ...reviewForm,
            isSubmitting: true,
            submissionError: null,
            submissionSuccess: false,
        });

        try {
            const response = await fetch(`${backendUrl}/api/review/doctors/${docId}/reviews`, { // Use docId prop
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: appToken,
                },
                body: JSON.stringify({
                    rating: reviewForm.rating,
                    reviewText: reviewForm.reviewText,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit review.');
            }
            const fetchReviewsResponse = await fetch(`${backendUrl}/api/review/doctors/${docId}/reviews`); // Use docId prop
            if (!fetchReviewsResponse.ok) {
                throw new Error(`Failed to refetch reviews after submission: ${fetchReviewsResponse.status}`);
            }
            const fetchedReviewsData = await fetchReviewsResponse.json();
            setReviews(fetchedReviewsData.reviews);

            setReviewForm({
                rating: 0,
                reviewText: '',
                isSubmitting: false,
                submissionSuccess: true,
                submissionError: null,
            });

            setTimeout(() => {
                setReviewForm({ ...reviewForm, submissionSuccess: false });
            }, 3000);

        } catch (err) {
            setReviewForm({
                ...reviewForm,
                isSubmitting: false,
                submissionError: err.message || 'An error occurred while submitting your review.',
            });
        }
    };

    return (
        <div style={{ width: '100%', fontFamily: 'sans-serif' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
                What Patients Say
            </h2>

            {loading && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <RefreshCw style={{ width: '1.5rem', height: '1.5rem', color: '#777', animation: 'spin 2s linear infinite' }} />
                    <span style={{ marginLeft: '0.5rem', color: '#777' }}>Loading reviews...</span>
                </div>
            )}
            {error && (
                <div style={{ backgroundColor: '#fdecea', border: '1px solid #e74c3c', color: '#e74c3c', padding: '1rem', borderRadius: '0.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center' }} role="alert">
                    <AlertTriangle style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                    <strong>Error:</strong>
                    <span style={{ marginLeft: '0.25rem' }}>{error}</span>
                </div>
            )}

            {!loading && !error && reviews.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {reviews.map((review) => (
                        <div key={review._id} style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '0.25rem', border: '1px solid #ddd', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <img
                                    src={review.patient.image}
                                    alt={review.patient.name}
                                    style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', marginRight: '0.75rem' }}
                                    referrerPolicy="no-referrer"
                                />
                                <div>
                                    <p style={{ fontWeight: 'bold', color: '#333', marginBottom: '0.1rem' }}>{review.patient.name}</p>
                                    <p style={{ fontSize: '0.75rem', color: '#777' }}>
                                        {formatDate(review.createdAt)}
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        style={{
                                            width: '1rem',
                                            height: '1rem',
                                            color: i < review.rating ? '#ffc107' : '#ccc',
                                            marginRight: '0.2rem',
                                        }}
                                    />
                                ))}
                            </div>
                            <p style={{ color: '#555' }}>{review.reviewText}</p>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && reviews.length === 0 && (
                <div style={{ backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '0.25rem', border: '1px dashed #ccc', color: '#777', textAlign: 'center' }}>
                    <MessageCircle style={{ width: '1.5rem', height: '1.5rem', margin: '0 auto 0.5rem', color: '#aaa' }} />
                    No reviews yet. Be the first to review this doctor!
                </div>
            )}

            <div style={{ marginTop: '1.5rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '0.25rem', border: '1px solid #ddd', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#333', marginBottom: '1rem' }}>
                    Write a Review
                </h3>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'medium', color: '#555', marginBottom: '0.25rem' }}>
                        Rating:
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.25rem' }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => handleRatingChange(i + 1)}
                                style={{
                                    padding: '0.2rem',
                                    outline: 'none',
                                    cursor: 'pointer',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                }}
                            >
                                <Star
                                    style={{
                                        width: '1.2rem',
                                        height: '1.2rem',
                                        color: i < reviewForm.rating ? '#ffc107' : '#ccc',
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                    {reviewForm.rating === 0 && (
                        <p style={{ fontSize: '0.75rem', color: '#e74c3c', marginTop: '0.25rem' }}>Please select a rating.</p>
                    )}
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'medium', color: '#555', marginBottom: '0.25rem' }}>
                        Your Review:
                    </label>
                    <textarea
                        value={reviewForm.reviewText}
                        onChange={handleInputChange}
                        rows={4}
                        placeholder="Write your review here..."
                        style={{
                            marginTop: '0.25rem',
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '0.25rem',
                            fontSize: '0.8rem',
                        }}
                    />
                </div>

                <button
                    onClick={handleSubmitReview}
                    disabled={reviewForm.isSubmitting}
                    style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.25rem',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {reviewForm.isSubmitting ? (
                        <>
                            <RefreshCw style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', animation: 'spin 2s linear infinite' }} />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <Send style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                            Submit Review
                        </>
                    )}
                </button>

                {reviewForm.submissionError && (
                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#e74c3c' }}>
                        {reviewForm.submissionError}
                    </p>
                )}
                {reviewForm.submissionSuccess && (
                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#28a745' }}>
                        Thank you for your review!
                    </p>
                )}
            </div>
        </div>
    );
};

const spin = `@keyframes spin {
    to { transform: rotate(360deg); }
}`;

const styles = document.createElement('style');
styles.textContent = spin;
document.head.appendChild(styles);

export default DoctorReviews;