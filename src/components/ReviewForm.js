import React, { useState } from 'react'
import '../index.css';

const facultyNames = {
  rigaku: '理学部第一部',
  kougaku: '工学部',
  souiki: '創域理工学部',
  senshin: '先進理工学部',
  yakugaku: '薬学部',
  keiei: '経営学部',
  rigaku2: '理学部第二部',
};

const departmentOptionsByFaculty = {
  理学部第一部: ['数学科', '物理学科', '化学科', '応用数学科', '応用化学科'],
  工学部: ['機械工学科', '工業化学科', '情報工学科', '電気工学科', '建築学科'],
  創域理工学部: ['数理科学科', '先端物理学科', '生命生物科学科', '建築学科', '先端化学科', '電気電子情報工学科', '機械航空宇宙工学科', '社会基盤工学科', '経営システム工学科', '情報計算科学科'],
  先進理工学部: ['電子システム工学科', 'マテリアル創成工学科', '生命システム工学科', '物理工学科', '機能デザイン工学科'],
  薬学部: ['薬学科', '生命創薬科学科'],
  経営学部: ['経営学科', 'ビジネスエコノミクス学科', '国際デザイン経営学科'],
  理学部第二部: ['数学科', '物理学科', '化学科']
};

const ReviewForm = ({ facultyId, onSubmit, onCancel }) => {
  const facultyName = facultyNames[facultyId] || '不明な学部';
  const departmentOptions = departmentOptionsByFaculty[facultyName] || [];

  const [formData, setFormData] = useState({
    lecture: '',
    department: '',
    professor: '',
    period: '',
    grading: '',
    difficulty: 'ふつう',
    rating: 3,
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit({ ...formData, faculty: facultyName });
    setFormData({
        lecture: '',
        department: '',
        professor: '',
        period: '',
        grading: '',
        difficulty: 'ふつう',
        rating: 3,
        comment: ''
    });
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>講義</label>
        <input name="lecture" value={formData.lecture} onChange={handleChange} required />
      </div>

      <div className="form-row">
        <label>学科</label>
        <select name="department" value={formData.department} onChange={handleChange} required>
          <option value="">選択してください</option>
          {departmentOptions.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      <div className="form-row two-columns">
        <div>
          <label>教授</label>
          <input
            name="professor"
            value={formData.professor}
            onChange={handleChange}
            required
            placeholder="例）田中 一郎"
          />
        </div>
        <div>
          <label>時限</label>
          <input
            name="period"
            value={formData.period}
            onChange={handleChange}
            required
            placeholder="例）水曜3限"
          />
        </div>
      </div>

      <div className="form-row">
        <label>成績の付け方</label>
        <input
          name="grading"
          value={formData.grading}
          onChange={handleChange}
          required 
          placeholder="例）到達度試験80%、出席20%"
        />
      </div>

      <div className="form-row two-columns">
        <div>
          <label>難易度</label>
          <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
            <option value="かんたん">かんたん</option>
            <option value="ふつう">ふつう</option>
            <option value="むずかしい">むずかしい</option>
          </select>
        </div>
        <div>
          <label>総合評価</label>
          <select name="rating" value={formData.rating} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{'★'.repeat(num)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <label>レビュー</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          required
          placeholder="授業内容や雰囲気、評価のされ方など自由に記入してください"
        />
      </div>

      <div className="button-group">
        <button type="button" onClick={onCancel} className="review-button cancel">
          キャンセル
        </button>
        <button type="submit" className="review-button submit">
          投稿する
        </button>
      </div>

    </form>
  )
}

export default ReviewForm;