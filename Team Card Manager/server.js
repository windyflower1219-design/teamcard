import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize data file if not exists
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({
        users: [], // { id, password, teamName }
        members: {}, // { userId: [members] }
        expenses: {} // { userId: [expenses] }
    }, null, 2));
}

const getData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
const saveData = (data) => fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

// Auth API
app.post('/api/signup', (req, res) => {
    const { id, password } = req.body;
    const data = getData();
    if (data.users.find(u => u.id === id)) {
        return res.status(400).json({ error: '이미 존재하는 아이디입니다.' });
    }
    data.users.push({ id, password });
    const now = new Date();
    const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    data.members[id] = [{ id: Date.now(), name: '나 (팀장)', role: 'MANAGER', budgets: [{ amount: 100000, effectiveDate: currentMonthStr }] }];
    data.expenses[id] = [];
    saveData(data);
    res.json({ success: true });
});

app.post('/api/login', (req, res) => {
    const { id, password } = req.body;
    const data = getData();
    const user = data.users.find(u => u.id === id && u.password === password);
    if (!user) return res.status(401).json({ error: '아이디 또는 비밀번호가 틀렸습니다.' });
    res.json({ success: true, id });
});

// App Data API
app.get('/api/data/:userId', (req, res) => {
    const { userId } = req.params;
    const data = getData();
    res.json({
        members: data.members[userId] || [],
        expenses: data.expenses[userId] || []
    });
});

app.post('/api/save/:userId', (req, res) => {
    const { userId } = req.params;
    const { members, expenses } = req.body;
    const data = getData();
    data.members[userId] = members;
    data.expenses[userId] = expenses;
    saveData(data);
    res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
