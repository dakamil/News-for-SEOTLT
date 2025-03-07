// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedNews = JSON.parse(localStorage.getItem('news')) || [];
    setNews(savedNews);
  }, []);

  useEffect(() => {
    localStorage.setItem('news', JSON.stringify(news));
  }, [news]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      const updatedNews = news.map((item) =>
        item.id === editingId ? { ...item, title, content } : item
      );
      setNews(updatedNews);
      setEditingId(null);
    } else {
      const newNews = {
        id: Date.now(),
        title,
        content,
      };
      setNews([newNews, ...news]);
    }
    setTitle('');
    setContent('');
  };

  const handleDelete = (id) => {
    const filteredNews = news.filter((item) => item.id !== id);
    setNews(filteredNews);
  };

  const handleEdit = (id) => {
    const newsItem = news.find((item) => item.id === id);
    setTitle(newsItem.title);
    setContent(newsItem.content);
    setEditingId(id);
  };

  return (
    <div className="container">
      <h1>Новости</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input"
        />
        <textarea
          placeholder="Содержание"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="textarea"
        />
        <button type="submit" className="button">
          {editingId ? 'Обновить новости' : 'Добавить новости'}
        </button>
      </form>

      <div className="news-list">
        {news.map((item) => (
          <div key={item.id} className="news-item">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <div className="buttons">
              <button onClick={() => handleEdit(item.id)} className="button edit">
                Редактировать
              </button>
              <button onClick={() => handleDelete(item.id)} className="button delete">
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
