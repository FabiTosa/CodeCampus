
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./data/users');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());


app.get('/api/users/:userId/seen', (req, res) => {
  const { userId } = req.params;
  const user = users[userId];

  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({ seenCourses: user.seenCourses });
});


app.post('/api/users/:userId/seen', (req, res) => {
  const { userId } = req.params;
  const { courseId } = req.body;

  if (!courseId) return res.status(400).json({ error: 'Missing courseId' });

  const user = users[userId];
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (!user.seenCourses.includes(courseId)) {
    user.seenCourses.push(courseId);
  }

  res.json({ message: 'Course marked as seen', seenCourses: user.seenCourses });
});


app.post('/api/users/:userId/reset', (req, res) => {
  const { userId } = req.params;
  if (users[userId]) {
    users[userId].seenCourses = [];
    res.json({ message: 'Reset seen courses' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
