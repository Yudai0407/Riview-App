import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';
import { CirclePlus, CircleX } from 'lucide-react';
import { motion } from "motion/react"
import { addReview, getReviewsByFaculty } from '../services/ReviewService';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

const facultyNames = {
    rigaku: '理学部第一部',
    kougaku: '工学部',
    souiki: '創域理工学部',
    senshin: '先進理工学部',
    yakugaku: '薬学部',
    keiei: '経営学部',
    rigaku2: '理学部第二部',
};

const FacultyPage = () => {
  const { facultyId } = useParams();
  const facultyName = facultyNames[facultyId] || '不明な学部';
  const { user } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviewsByFaculty(facultyId);
      setReviews(data);
    };
    fetchReviews();
  }, [facultyId]);

  const handleReviewSubmit = async (newReview) => {
    try {
      await addReview({ ...newReview, facultyId });
      const updateReviews = await getReviewsByFaculty(facultyId);
      setReviews(updateReviews);
      setShowForm(false);
    } catch (error) {
      console.error('レビューの保存に失敗しました:', error);
    }
  };

  const handleAddClick = async () => {
    if (!user) {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (err) {
        alert("ログインがキャンセルされました");
        return;
      }
    }
    setShowForm(true);
  };
  
  return (
    <>
      <Header />
      <div className='faculty-container'>
        <h1 className='faculty-title'>{facultyName} の講義レビュー</h1>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200 }}
          onClick={handleAddClick}
          style={{ display: 'inline-block', cursor: 'pointer', marginBottom: '20px' }}
        >
          <CirclePlus size={36} />
        </motion.div>

        {showForm && (
          <div className='modalOverlay'>
            <div className='modalContent'>
              <ReviewForm
                facultyId={facultyId}
                onSubmit={handleReviewSubmit}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        <div className='review-list'>
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="review-card"
              whileHover={{ scale: 1.00 }}
              onClick={() => setSelectedReview(review)}
            >
              <div className="review-header">{review.lecture}</div>
              <div className="review-body">
                <div className="review-info-left">
                  <div>
                    <span className="review-label">教授：</span>{review.professor}
                  </div>
                  <div>
                    <span className="review-label">時限：</span>{review.period}
                  </div>
                </div>
                <div className="review-info-right">
                  <span className="review-stars">{'★'.repeat(review.rating)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {selectedReview && (
          <div className="modal-overlay" onClick={() => setSelectedReview(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <CircleX className="close-button" onClick={() => setSelectedReview(null)}/>
              {/* <button className="close-button" onClick={() => setSelectedReview(null)}>×</button> */}
              <h1>{selectedReview.lecture}</h1>
              <div><strong>学科：</strong>{selectedReview.department}</div>
              <div><strong>教授：</strong>{selectedReview.professor}</div>
              <div><strong>時限：</strong>{selectedReview.period}</div>
              <div><strong>成績の付け方：</strong>{selectedReview.grading}</div>
              <div><strong>難易度：</strong>{selectedReview.difficulty}</div>
              <div><strong>総合評価：</strong>{'★'.repeat(selectedReview.rating)}</div>
              <div className="comment"><strong>レビュー：</strong><br />{selectedReview.comment}</div>
            </div>
          </div>
        )}
      </div>    
    </>
  );
}

export default FacultyPage;