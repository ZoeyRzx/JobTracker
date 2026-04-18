import React, { useState, useMemo } from 'react';
import { LayoutDashboard, Briefcase, TrendingUp, Calendar, FileText, Lightbulb, Heart, Mail, Plus, Search, X, ChevronRight, AlertCircle, CheckCircle2, Clock, MapPin, ArrowRight, Trash2, Edit3, MoreHorizontal, AlertTriangle, Sparkles, TrendingDown, Users, Target, Award, BookOpen, Smile, Meh } from 'lucide-react';

export default function JobTracker() {
  // ===== 全部 state 集中在顶部,避免作用域问题 =====
  const [activeView, setActiveView] = useState('dashboard');
  const [viewMode, setViewMode] = useState('table');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState(null);
  const [moodToday, setMoodToday] = useState(null);
  const [moodNote, setMoodNote] = useState('');
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [globalToast, setGlobalToast] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [viewingResume, setViewingResume] = useState(null);
  const [editingApp, setEditingApp] = useState(null);
  const [showWatchModal, setShowWatchModal] = useState(false);
  const [viewingCompanyJobs, setViewingCompanyJobs] = useState(null);
  const [emailFilter, setEmailFilter] = useState('all');
  const [processedEmails, setProcessedEmails] = useState({});
  const [viewingEmail, setViewingEmail] = useState(null);
  const [emailToast, setEmailToast] = useState(null);
  const [resumeMenuId, setResumeMenuId] = useState(null);

  const showGlobalToast = (msg) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(null), 2200);
  };
  const showEmailToast = (msg) => {
    setEmailToast(msg);
    setTimeout(() => setEmailToast(null), 2200);
  };

  // ===== 数据 state =====
  const [applications, setApplications] = useState([
    { id: 1, company: '字节跳动', logo: '字', logoColor: '#3B82F6', position: '产品经理-抖音', location: '北京', deadline: '2026-04-25', status: '二面', priority: 'high', resumeVersion: '产品版V3', salary: '25-35K', notes: '已过一面,HR反馈良好' },
    { id: 2, company: '腾讯', logo: '腾', logoColor: '#06B6D4', position: '策划-游戏', location: '深圳', deadline: '2026-04-22', status: '笔试', priority: 'high', resumeVersion: '游戏版V1', salary: '22-30K', notes: '笔试4月22日19:00' },
    { id: 3, company: '美团', logo: '美', logoColor: '#FACC15', position: '数据分析师', location: '上海', deadline: '2026-04-30', status: '投递', priority: 'medium', resumeVersion: '数据版V2', salary: '20-28K', notes: '' },
    { id: 4, company: '中金公司', logo: '中', logoColor: '#EF4444', position: 'IBD暑期实习', location: '北京', deadline: '2026-05-02', status: '一面', priority: 'high', resumeVersion: '金融版V4', salary: '面议', notes: '4月20日下午3点电话面' },
    { id: 5, company: '麦肯锡', logo: 'M', logoColor: '#1E40AF', position: 'BA咨询顾问', location: '上海', deadline: '2026-05-10', status: '投递', priority: 'high', resumeVersion: '咨询版V2', salary: '面议', notes: '等待Case面通知' },
    { id: 6, company: '阿里巴巴', logo: '阿', logoColor: '#F97316', position: '运营-淘宝', location: '杭州', deadline: '2026-04-28', status: '终面', priority: 'high', resumeVersion: '产品版V3', salary: '20-28K', notes: '4月26日HR终面' },
    { id: 7, company: '小红书', logo: '小', logoColor: '#EC4899', position: '内容运营', location: '上海', deadline: '2026-05-05', status: '笔试', priority: 'medium', resumeVersion: '内容版V1', salary: '18-25K', notes: '' },
    { id: 8, company: '百度', logo: '百', logoColor: '#2563EB', position: 'AI产品经理', location: '北京', deadline: '2026-04-24', status: '拒信', priority: 'low', resumeVersion: '产品版V3', salary: '25-35K', notes: '二面挂,复盘原因' },
    { id: 9, company: '网易', logo: '网', logoColor: '#DC2626', position: '游戏策划', location: '广州', deadline: '2026-05-08', status: '一面', priority: 'medium', resumeVersion: '游戏版V1', salary: '18-25K', notes: '' },
    { id: 10, company: '京东', logo: '京', logoColor: '#B91C1C', position: '商业分析', location: '北京', deadline: '2026-04-26', status: 'Offer', priority: 'high', resumeVersion: '数据版V2', salary: '22K', notes: '已口头offer,纠结中' },
    { id: 11, company: '拼多多', logo: '拼', logoColor: '#E11D48', position: '商品运营', location: '上海', deadline: '2026-05-12', status: '投递', priority: 'low', resumeVersion: '产品版V3', salary: '25-35K', notes: '' },
    { id: 12, company: '华为', logo: '华', logoColor: '#991B1B', position: '产品解决方案', location: '深圳', deadline: '2026-04-29', status: '二面', priority: 'medium', resumeVersion: '技术版V2', salary: '20-28K', notes: '' },
  ]);

  const [resumeList, setResumeList] = useState([
    { name: '产品版V3', usedBy: 3, interviews: 2, offers: 0, color: '#3B82F6', update: '2天前' },
    { name: '游戏版V1', usedBy: 2, interviews: 1, offers: 0, color: '#DC2626', update: '1周前' },
    { name: '数据版V2', usedBy: 2, interviews: 1, offers: 1, color: '#10B981', update: '4天前' },
    { name: '金融版V4', usedBy: 1, interviews: 1, offers: 0, color: '#EF4444', update: '3天前' },
    { name: '咨询版V2', usedBy: 1, interviews: 0, offers: 0, color: '#1E40AF', update: '5天前' },
    { name: '内容版V1', usedBy: 1, interviews: 0, offers: 0, color: '#EC4899', update: '1周前' },
    { name: '技术版V2', usedBy: 1, interviews: 0, offers: 0, color: '#7C3AED', update: '6天前' },
  ]);

  const [interviewList, setInterviewList] = useState([
    { id: 1, company: '字节跳动', round: '一面', date: '2026-04-15', questions: ['自我介绍3分钟', '最有成就感的项目', '如何看待抖音和小红书的差异', '对推荐算法的理解', '职业规划'], reflection: '项目细节准备充分,但对竞品分析深度不够,需要加强行业洞察' },
    { id: 2, company: '百度', round: '二面', date: '2026-04-12', questions: ['AI产品和传统产品的区别', '如何设计一个ChatGPT', 'PM如何与算法工程师协作', '用户增长案例分析'], reflection: 'AI相关概念回答不够深入,需要系统学习LLM基础知识' },
    { id: 3, company: '中金公司', round: '群面', date: '2026-04-10', questions: ['估算中国奶茶市场规模', '并购案例讨论', '时间管理问题'], reflection: '估算逻辑清晰,但表达不够简洁,被队友抢了leader位' },
    { id: 4, company: '阿里巴巴', round: '二面', date: '2026-04-13', questions: ['淘宝首页改版建议', '电商用户分层', '手淘vs天猫定位', '双11运营策略'], reflection: '对电商业务理解不错,但缺乏数据支撑' },
  ]);

  const [moodHistory, setMoodHistory] = useState([
    { date: '4-11', mood: 3, note: '被百度拒了,难过', trigger: '拒信' },
    { date: '4-12', mood: 2, note: '持续低落中', trigger: '' },
    { date: '4-13', mood: 4, note: '阿里二面顺利', trigger: '面试通过' },
    { date: '4-14', mood: 4, note: '平静地准备笔试', trigger: '' },
    { date: '4-15', mood: 5, note: '字节一面感觉很好!', trigger: '面试通过' },
    { date: '4-16', mood: 3, note: '等消息焦虑', trigger: '' },
    { date: '4-17', mood: 5, note: '京东给口头offer了!', trigger: 'Offer' },
  ]);

  const emails = [
    { id: 1, from: 'hr@bytedance.com', mailbox: 'QQ邮箱', subject: '【字节跳动】二面安排通知', type: '面试邀约', company: '字节跳动', time: '2小时前', unread: true, rescued: false, extracted: { date: '2026-04-21 14:00', location: '腾讯会议 ID: 123-456-789' }, priority: 'urgent' },
    { id: 2, from: 'no-reply@tencent.com', mailbox: 'Gmail', subject: '腾讯2026校招笔试邀请', type: '笔试通知', company: '腾讯', time: '5小时前', unread: true, rescued: false, extracted: { date: '2026-04-22 19:00', location: '在线笔试平台' }, priority: 'urgent' },
    { id: 3, from: 'campus@jd.com', mailbox: '学校邮箱', subject: '【京东】录用意向书', type: 'Offer', company: '京东', time: '1天前', unread: false, rescued: false, extracted: null, priority: 'high' },
    { id: 4, from: 'hr@cicc.com.cn', mailbox: 'QQ邮箱', subject: '中金公司一面通知', type: '面试邀约', company: '中金公司', time: '1天前', unread: false, rescued: true, extracted: { date: '2026-04-20 15:00', location: '电话面试' }, priority: 'urgent' },
    { id: 5, from: 'recruitment@mckinsey.com', mailbox: 'Gmail', subject: 'Case Interview Preparation', type: '材料补充', company: '麦肯锡', time: '2天前', unread: true, rescued: true, extracted: null, priority: 'high' },
    { id: 6, from: 'hr@baidu.com', mailbox: '163邮箱', subject: '百度面试结果通知', type: '拒信', company: '百度', time: '3天前', unread: false, rescued: false, extracted: null, priority: 'low' },
    { id: 7, from: 'campus@xiaohongshu.com', mailbox: 'QQ邮箱', subject: '小红书笔试链接', type: '笔试通知', company: '小红书', time: '4小时前', unread: true, rescued: false, extracted: { date: '2026-04-23 20:00', location: '牛客网' }, priority: 'urgent' },
    { id: 8, from: 'hr@sensetime.com', mailbox: 'QQ邮箱', subject: '商汤科技面试邀请', type: '面试邀约', company: '商汤科技(未录入)', time: '6小时前', unread: true, rescued: true, extracted: { date: '2026-04-25 10:00', location: '线下面试' }, priority: 'high', newCompany: true },
  ];

  const statusOptions = ['投递', '笔试', '一面', '二面', '终面', 'Offer', '拒信'];
  const statusColors = {
    '投递': { bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE' },
    '笔试': { bg: '#FEF3C7', text: '#92400E', border: '#FDE68A' },
    '一面': { bg: '#FCE7F3', text: '#9D174D', border: '#FBCFE8' },
    '二面': { bg: '#E0E7FF', text: '#3730A3', border: '#C7D2FE' },
    '终面': { bg: '#F3E8FF', text: '#6B21A8', border: '#E9D5FF' },
    'Offer': { bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0' },
    '拒信': { bg: '#FEE2E2', text: '#991B1B', border: '#FECACA' },
  };
  const typeColors = {
    '面试邀约': { bg: '#E0E7FF', text: '#3730A3' },
    '笔试通知': { bg: '#FEF3C7', text: '#92400E' },
    'Offer': { bg: '#D1FAE5', text: '#065F46' },
    '拒信': { bg: '#FEE2E2', text: '#991B1B' },
    '材料补充': { bg: '#F3E8FF', text: '#6B21A8' },
  };

  // ===== 计算派生数据 =====
  const stats = useMemo(() => {
    const total = applications.length;
    const offers = applications.filter(a => a.status === 'Offer').length;
    const interviewing = applications.filter(a => ['一面', '二面', '终面'].includes(a.status)).length;
    const rejected = applications.filter(a => a.status === '拒信').length;
    return { total, offers, interviewing, rejected, rate: total > 0 ? ((offers / total) * 100).toFixed(1) : 0 };
  }, [applications]);

  const funnelData = useMemo(() => {
    const stages = ['投递', '笔试', '一面', '二面', '终面', 'Offer'];
    const counts = stages.map(s => {
      const idx = stages.indexOf(s);
      return applications.filter(a => {
        const aIdx = stages.indexOf(a.status);
        return aIdx >= idx && a.status !== '拒信';
      }).length + (s === '投递' ? applications.filter(a => a.status === '拒信').length : 0);
    });
    return stages.map((s, i) => ({ stage: s, count: counts[i], rate: counts[0] > 0 ? ((counts[i] / counts[0]) * 100).toFixed(0) : 0 }));
  }, [applications]);

  const upcomingTasks = useMemo(() => {
    const today = new Date('2026-04-18');
    return applications
      .filter(a => a.status !== 'Offer' && a.status !== '拒信')
      .map(a => ({ ...a, daysLeft: Math.ceil((new Date(a.deadline) - today) / (1000 * 60 * 60 * 24)) }))
      .filter(a => a.daysLeft >= 0 && a.daysLeft <= 14)
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, [applications]);

  // ===== 事件处理函数 =====
  const handleAddToCalendar = (email) => {
    setProcessedEmails({ ...processedEmails, [email.id]: { ...processedEmails[email.id], calendar: true } });
    showEmailToast(`✅ 已加入日历:${email.extracted.date}`);
  };

  const handleCreateApp = (email) => {
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    const companyName = email.company.replace('(未录入)', '');
    setApplications([...applications, {
      id: applications.length + 1,
      company: companyName,
      logo: companyName[0],
      logoColor: colors[applications.length % colors.length],
      position: '待补充',
      location: '待补充',
      deadline: email.extracted?.date?.split(' ')[0] || '2026-05-01',
      status: email.type === '面试邀约' ? '一面' : '投递',
      priority: 'medium',
      resumeVersion: '产品版V3',
      salary: '面议',
      notes: `从邮件自动创建:${email.subject}`
    }]);
    setProcessedEmails({ ...processedEmails, [email.id]: { ...processedEmails[email.id], created: true } });
    showEmailToast(`✅ 已为「${companyName}」创建申请记录`);
  };

  const handleUpdateEmailStatus = (email) => {
    const app = applications.find(a => email.company.includes(a.company));
    if (!app) { showEmailToast('⚠️ 请先创建此公司的申请记录'); return; }
    const statusMap = { '面试邀约': '一面', '笔试通知': '笔试', 'Offer': 'Offer', '拒信': '拒信' };
    const newStatus = statusMap[email.type];
    if (newStatus) {
      setApplications(applications.map(a => a.id === app.id ? { ...a, status: newStatus } : a));
      setProcessedEmails({ ...processedEmails, [email.id]: { ...processedEmails[email.id], statusUpdated: true } });
      showEmailToast(`✅ 已将「${app.company}」状态更新为「${newStatus}」`);
    }
  };

  // ===== 侧边栏 =====
  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', name: '首页', icon: LayoutDashboard },
      { id: 'applications', name: '申请管理', icon: Briefcase, badge: applications.length },
      { id: 'funnel', name: '漏斗分析', icon: TrendingUp },
      { id: 'calendar', name: '申请日历', icon: Calendar },
      { id: 'resumes', name: '简历库', icon: FileText, badge: resumeList.length },
      { id: 'interviews', name: '面经复盘', icon: Lightbulb, badge: interviewList.length },
      { id: 'mood', name: '心态记录', icon: Heart },
      { id: 'emails', name: '邮件智能扫描', icon: Mail, badge: emails.filter(e => e.unread).length, badgeColor: 'red' },
    ];
    return (
      <div className="w-60 bg-white border-r border-slate-200 flex flex-col h-full">
        <div className="p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">JobTracker</div>
              <div className="text-xs text-slate-500">求职指挥中心</div>
            </div>
          </div>
        </div>
        <div className="px-3 py-4 flex-1 overflow-y-auto">
          <div className="text-xs text-slate-400 font-medium px-3 mb-2">主菜单</div>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button key={item.id} onClick={() => setActiveView(item.id)} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg mb-1 text-sm transition-all ${isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}>
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${item.badgeColor === 'red' ? 'bg-red-100 text-red-600' : isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>
        <div className="p-3 border-t border-slate-200">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-xs font-medium text-indigo-900">今日格言</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">被拒不是终点,是匹配度的筛选。继续前进 💪</p>
          </div>
        </div>
      </div>
    );
  };

  // ===== 紧急横幅 =====
  const UrgentBanner = () => {
    const urgent = upcomingTasks.filter(t => t.daysLeft <= 3).slice(0, 3);
    if (urgent.length === 0) return null;
    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-6 py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span className="text-xs font-medium text-amber-900 flex-shrink-0">紧急待办:</span>
          {urgent.map((task, i) => (
            <React.Fragment key={task.id}>
              {i > 0 && <span className="text-amber-300">·</span>}
              <span className="text-xs text-amber-800 flex-shrink-0">
                <span className="font-medium">{task.company}</span> {task.status}
                <span className="ml-1 text-amber-600">{task.daysLeft === 0 ? '今日截止' : task.daysLeft === 1 ? '明日截止' : `还剩${task.daysLeft}天`}</span>
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // ===== Dashboard =====
  const DashboardView = () => (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">早上好 👋</h1>
          <p className="text-sm text-slate-500 mt-1">今天是 2026年4月18日,你有 {upcomingTasks.length} 项待办需要关注</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
          <Plus className="w-4 h-4" />新增申请
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2"><span className="text-xs text-slate-500">总申请数</span><Briefcase className="w-4 h-4 text-slate-400" /></div>
          <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
          <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1"><TrendingUp className="w-3 h-3" />较上周 +3</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2"><span className="text-xs text-slate-500">面试中</span><Users className="w-4 h-4 text-slate-400" /></div>
          <div className="text-2xl font-bold text-indigo-600">{stats.interviewing}</div>
          <div className="text-xs text-slate-500 mt-1">一面/二面/终面</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2"><span className="text-xs text-slate-500">Offer</span><Award className="w-4 h-4 text-slate-400" /></div>
          <div className="text-2xl font-bold text-emerald-600">{stats.offers}</div>
          <div className="text-xs text-slate-500 mt-1">转化率 {stats.rate}%</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2"><span className="text-xs text-slate-500">已拒</span><TrendingDown className="w-4 h-4 text-slate-400" /></div>
          <div className="text-2xl font-bold text-slate-600">{stats.rejected}</div>
          <div className="text-xs text-slate-500 mt-1">复盘学习中</div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-600" />
            <span className="font-semibold text-slate-900">📬 邮件智能扫描</span>
            <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">实时</span>
          </div>
          <button onClick={() => setActiveView('emails')} className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1">查看全部<ChevronRight className="w-3 h-3" /></button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white/70 rounded-lg p-3"><div className="text-xs text-slate-500 mb-1">今日新邮件</div><div className="text-xl font-bold text-slate-900">{emails.filter(e => e.time.includes('小时')).length}</div></div>
          <div className="bg-white/70 rounded-lg p-3"><div className="text-xs text-slate-500 mb-1">关键未读</div><div className="text-xl font-bold text-red-600">{emails.filter(e => e.unread && e.priority === 'urgent').length}</div></div>
          <div className="bg-white/70 rounded-lg p-3"><div className="text-xs text-slate-500 mb-1">垃圾箱捞回</div><div className="text-xl font-bold text-amber-600">{emails.filter(e => e.rescued).length}</div></div>
          <div className="bg-white/70 rounded-lg p-3"><div className="text-xs text-slate-500 mb-1">待新建申请</div><div className="text-xl font-bold text-purple-600">{emails.filter(e => e.newCompany).length}</div></div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs bg-amber-100 text-amber-900 px-3 py-2 rounded-lg">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>从垃圾箱捞出 {emails.filter(e => e.rescued).length} 封重要招聘邮件,差点漏掉!</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Clock className="w-4 h-4 text-slate-500" />近14天待办时间轴</h3>
            <button onClick={() => setActiveView('calendar')} className="text-xs text-indigo-600">查看日历 →</button>
          </div>
          <div className="space-y-2">
            {upcomingTasks.length === 0 && <div className="text-xs text-slate-400 text-center py-6">暂无14天内待办</div>}
            {upcomingTasks.slice(0, 6).map(task => {
              const urgent = task.daysLeft <= 2;
              return (
                <div key={task.id} onClick={() => setSelectedApp(task)} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer group">
                  <div className={`w-12 text-center flex-shrink-0 ${urgent ? 'text-red-600' : 'text-slate-600'}`}>
                    <div className="text-xs">{task.daysLeft === 0 ? '今日' : `${task.daysLeft}天`}</div>
                    <div className="text-[10px] text-slate-400">{task.deadline.slice(5)}</div>
                  </div>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: task.logoColor }}>{task.logo}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 truncate">{task.company} · {task.position}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: statusColors[task.status].bg, color: statusColors[task.status].text }}>{task.status}</span>
                      <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{task.location}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-slate-500" />漏斗预览</h3>
            <button onClick={() => setActiveView('funnel')} className="text-xs text-indigo-600">详情 →</button>
          </div>
          <div className="space-y-2">
            {funnelData.map((stage, i) => {
              const maxCount = funnelData[0].count;
              const width = (stage.count / maxCount) * 100;
              return (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600">{stage.stage}</span>
                    <span className="text-slate-900 font-medium">{stage.count} · {stage.rate}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${width}%`, background: `linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)`, opacity: 1 - i * 0.12 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Heart className="w-4 h-4 text-rose-500" />最近7天心态曲线</h3>
          <button onClick={() => setActiveView('mood')} className="text-xs text-indigo-600">打卡 →</button>
        </div>
        <div className="flex items-end gap-2 h-24">
          {moodHistory.map((d, i) => {
            const height = (d.mood / 5) * 100;
            const color = d.mood >= 4 ? '#10B981' : d.mood >= 3 ? '#F59E0B' : '#EF4444';
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                <div className="w-full bg-slate-100 rounded-t relative flex-1 flex items-end">
                  <div className="w-full rounded-t transition-all hover:opacity-80" style={{ height: `${height}%`, backgroundColor: color }} />
                </div>
                <span className="text-[10px] text-slate-500">{d.date}</span>
                {d.trigger && <div className="absolute -top-1 right-0 w-1.5 h-1.5 bg-indigo-500 rounded-full" />}
                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-10">{d.note}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // ===== 申请管理 =====
  const ApplicationsView = () => {
    const filtered = applications.filter(a => {
      const matchSearch = a.company.includes(searchQuery) || a.position.includes(searchQuery);
      const matchStatus = filterStatus === 'all' || a.status === filterStatus;
      return matchSearch && matchStatus;
    });
    return (
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">申请管理</h1>
            <p className="text-sm text-slate-500 mt-1">共 {filtered.length} 条记录</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button onClick={() => setViewMode('table')} className={`px-3 py-1.5 rounded-md text-xs font-medium ${viewMode === 'table' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600'}`}>表格</button>
              <button onClick={() => setViewMode('kanban')} className={`px-3 py-1.5 rounded-md text-xs font-medium ${viewMode === 'kanban' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-600'}`}>看板</button>
            </div>
            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
              <Plus className="w-4 h-4" />新增
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="搜索公司/岗位..." className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
          </div>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:border-indigo-400">
            <option value="all">全部状态</option>
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {viewMode === 'table' ? (
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 text-xs">公司</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 text-xs">岗位</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 text-xs">地点</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 text-xs">状态</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 text-xs">截止日期</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 text-xs">简历版本</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 text-xs">薪资</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(app => (
                  <tr key={app.id} onClick={() => setSelectedApp(app)} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: app.logoColor }}>{app.logo}</div>
                        <span className="font-medium text-slate-900">{app.company}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{app.position}</td>
                    <td className="px-4 py-3 text-slate-600">{app.location}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded text-xs border" style={{ backgroundColor: statusColors[app.status].bg, color: statusColors[app.status].text, borderColor: statusColors[app.status].border }}>{app.status}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{app.deadline}</td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">{app.resumeVersion}</span></td>
                    <td className="px-4 py-3 text-slate-700">{app.salary}</td>
                    <td className="px-2"><ChevronRight className="w-4 h-4 text-slate-300" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-3 overflow-x-auto">
            {statusOptions.map(status => {
              const items = filtered.filter(a => a.status === status);
              return (
                <div key={status} className="bg-slate-50 rounded-xl p-3 min-w-[160px]">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-semibold" style={{ color: statusColors[status].text }}>{status}</span>
                    <span className="text-xs text-slate-400">{items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {items.map(app => (
                      <div key={app.id} onClick={() => setSelectedApp(app)} className="bg-white rounded-lg p-2.5 cursor-pointer hover:shadow-sm transition border border-slate-100">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: app.logoColor }}>{app.logo}</div>
                          <span className="text-xs font-medium text-slate-900 truncate">{app.company}</span>
                        </div>
                        <div className="text-[11px] text-slate-600 mb-1">{app.position}</div>
                        <div className="text-[10px] text-slate-400">{app.deadline}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // ===== 漏斗分析 =====
  const FunnelView = () => {
    const avgDays = { '投递→笔试': 4, '笔试→一面': 7, '一面→二面': 5, '二面→终面': 6, '终面→Offer': 3 };
    const watchedCompanies = [
      { company: '字节跳动', logo: '字', color: '#3B82F6', newJobs: 47, trend: 'up', trendValue: 12, highlight: '你关注的「产品经理」方向 8 个新岗位', matched: 8 },
      { company: '腾讯', logo: '腾', color: '#06B6D4', newJobs: 32, trend: 'up', trendValue: 5, highlight: 'IEG游戏业务新开放 6 个策划岗', matched: 6 },
      { company: '美团', logo: '美', color: '#FACC15', newJobs: 18, trend: 'down', trendValue: -3, highlight: '数据分析岗较上周减少', matched: 2 },
      { company: '阿里巴巴', logo: '阿', color: '#F97316', newJobs: 29, trend: 'up', trendValue: 8, highlight: '淘天集团运营岗密集释放', matched: 5 },
      { company: '小红书', logo: '小', color: '#EC4899', newJobs: 15, trend: 'up', trendValue: 4, highlight: '内容运营方向 3 个新岗', matched: 3 },
      { company: '京东', logo: '京', color: '#B91C1C', newJobs: 11, trend: 'flat', trendValue: 0, highlight: '商业分析岗本周无变动', matched: 1 },
    ];
    return (
      <div className="p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">漏斗分析</h1>
          <p className="text-sm text-slate-500 mt-1">看清每个阶段的转化率和卡点</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-slate-900">转化漏斗</h3>
                <p className="text-xs text-slate-500 mt-0.5">统计口径:到达该阶段的申请数</p>
              </div>
            </div>
            <div className="space-y-3">
              {funnelData.map((stage, i) => {
                const maxCount = funnelData[0].count;
                const width = (stage.count / maxCount) * 100;
                const prevCount = i > 0 ? funnelData[i - 1].count : stage.count;
                const stepRate = i > 0 && prevCount > 0 ? ((stage.count / prevCount) * 100).toFixed(0) : 100;
                return (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-medium text-slate-700">{stage.stage}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500">整体转化 {stage.rate}%</span>
                        {i > 0 && <span className="text-slate-400">阶段转化 {stepRate}%</span>}
                        <span className="text-slate-900 font-semibold">{stage.count} 个</span>
                      </div>
                    </div>
                    <div className="h-8 bg-slate-100 rounded-lg overflow-hidden flex items-center">
                      <div className="h-full rounded-lg flex items-center justify-end pr-3 transition-all" style={{ width: `${width}%`, background: `linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)`, opacity: 1 - i * 0.1 }}>
                        <span className="text-white text-xs font-medium">{stage.count}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold text-slate-900 mb-4">各阶段平均耗时</h3>
            <div className="space-y-3">
              {Object.entries(avgDays).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">{k}</span>
                  <span className="text-sm font-semibold text-slate-900">{v} 天</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500 mb-1">整体平均周期</div>
              <div className="text-lg font-bold text-indigo-600">25 天</div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              关注公司 · 近7日新增岗位
            </h3>
            <button onClick={() => setShowWatchModal(true)} className="text-xs text-indigo-600 hover:text-indigo-700">管理关注列表 →</button>
          </div>
          <p className="text-xs text-slate-500 mb-4">数据来源:各公司官方招聘站 + 主流招聘平台,每日自动抓取</p>

          <div className="grid grid-cols-2 gap-3">
            {watchedCompanies.map((c, i) => (
              <div key={i} onClick={() => setViewingCompanyJobs(c)} className="border border-slate-100 rounded-lg p-3 hover:border-indigo-200 hover:bg-indigo-50/30 transition cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: c.color }}>{c.logo}</div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{c.company}</div>
                      <div className="text-[10px] text-slate-500">近7日新增</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">{c.newJobs}</div>
                    <div className={`text-[10px] flex items-center gap-0.5 justify-end ${c.trend === 'up' ? 'text-emerald-600' : c.trend === 'down' ? 'text-red-600' : 'text-slate-400'}`}>
                      {c.trend === 'up' && <TrendingUp className="w-2.5 h-2.5" />}
                      {c.trend === 'down' && <TrendingDown className="w-2.5 h-2.5" />}
                      {c.trend === 'flat' ? '持平' : `${c.trendValue > 0 ? '+' : ''}${c.trendValue} vs 上周`}
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-start gap-1.5">
                    {c.matched > 0 ? (
                      <>
                        <Target className="w-3 h-3 text-indigo-500 flex-shrink-0 mt-0.5" />
                        <div className="text-[11px] text-slate-600 leading-relaxed">{c.highlight}</div>
                      </>
                    ) : (
                      <div className="text-[11px] text-slate-400">{c.highlight}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <Lightbulb className="w-4 h-4 text-indigo-600 flex-shrink-0" />
            <div className="text-xs text-slate-700">
              <span className="font-medium text-indigo-900">本周机会提示:</span>
              字节 + 阿里合计 13 个匹配岗位,建议优先准备。点击公司卡片可查看岗位详情并一键加入申请列表。
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ===== 日历 =====
  const CalendarView = () => {
    const firstDay = new Date(2026, 3, 1).getDay();
    const daysInMonth = 30;
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    const getDayEvents = (day) => {
      if (!day) return [];
      const dateStr = `2026-04-${String(day).padStart(2, '0')}`;
      return applications.filter(a => a.deadline === dateStr);
    };
    return (
      <div className="p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">申请日历</h1>
          <p className="text-sm text-slate-500 mt-1">2026年4月 · 所有截止日期、笔试、面试一览</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-5">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['日', '一', '二', '三', '四', '五', '六'].map(d => <div key={d} className="text-center text-xs font-medium text-slate-500 py-2">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, i) => {
                const events = getDayEvents(day);
                const isToday = day === 18;
                const isSelected = selectedDate === day;
                return (
                  <div key={i} onClick={() => day && setSelectedDate(day)} className={`aspect-square border rounded-lg p-1.5 cursor-pointer transition ${!day ? 'border-transparent' : isSelected ? 'border-indigo-500 bg-indigo-50' : isToday ? 'border-indigo-300 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-300'}`}>
                    {day && (
                      <>
                        <div className={`text-xs font-medium ${isToday ? 'text-indigo-600' : 'text-slate-700'}`}>{day}</div>
                        <div className="mt-1 space-y-0.5">
                          {events.slice(0, 2).map(e => <div key={e.id} className="text-[9px] truncate px-1 rounded" style={{ backgroundColor: statusColors[e.status].bg, color: statusColors[e.status].text }}>{e.company}</div>)}
                          {events.length > 2 && <div className="text-[9px] text-slate-400 px-1">+{events.length - 2}</div>}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <h3 className="font-semibold text-slate-900 mb-3">{selectedDate ? `4月${selectedDate}日` : '选择日期查看'}</h3>
            <div className="space-y-2">
              {selectedDate && getDayEvents(selectedDate).length > 0 ? (
                getDayEvents(selectedDate).map(e => (
                  <div key={e.id} onClick={() => setSelectedApp(e)} className="p-3 border border-slate-100 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: e.logoColor }}>{e.logo}</div>
                      <span className="text-sm font-medium">{e.company}</span>
                    </div>
                    <div className="text-xs text-slate-600">{e.position}</div>
                    <div className="mt-1.5 inline-block px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: statusColors[e.status].bg, color: statusColors[e.status].text }}>{e.status}</div>
                  </div>
                ))
              ) : selectedDate ? (
                <div className="text-xs text-slate-400 text-center py-6">这天没有事项</div>
              ) : (
                <div className="text-xs text-slate-400 text-center py-6">点击左侧日期查看</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ===== 简历库 =====
  const ResumesView = () => {
    const handleDeleteResume = (name) => {
      if (confirm(`确认删除简历「${name}」?`)) {
        setResumeList(resumeList.filter(r => r.name !== name));
        showGlobalToast('✅ 已删除简历版本');
        setResumeMenuId(null);
      }
    };
    const companiesUsing = (name) => applications.filter(a => a.resumeVersion === name);
    return (
      <div className="p-6 space-y-5" onClick={() => setResumeMenuId(null)}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">简历库</h1>
            <p className="text-sm text-slate-500 mt-1">多版本简历管理与效果追踪</p>
          </div>
          <button onClick={() => setShowResumeModal(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
            <Plus className="w-4 h-4" />新建版本
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {resumeList.map((r, i) => {
            const passRate = r.usedBy > 0 ? ((r.interviews / r.usedBy) * 100).toFixed(0) : 0;
            return (
              <div key={i} onClick={() => setViewingResume(r)} className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-indigo-200 transition cursor-pointer relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: r.color + '20' }}>
                    <FileText className="w-5 h-5" style={{ color: r.color }} />
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setResumeMenuId(resumeMenuId === i ? null : i); }} className="p-1 hover:bg-slate-100 rounded">
                    <MoreHorizontal className="w-4 h-4 text-slate-400" />
                  </button>
                  {resumeMenuId === i && (
                    <div className="absolute top-12 right-4 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10 min-w-[100px]" onClick={e => e.stopPropagation()}>
                      <button onClick={() => { setViewingResume(r); setResumeMenuId(null); }} className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 text-left">查看详情</button>
                      <button onClick={() => { setResumeMenuId(null); showGlobalToast('📝 编辑简历内容需跳转文档工具'); }} className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 text-left">编辑内容</button>
                      <button onClick={() => handleDeleteResume(r.name)} className="w-full px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 text-left">删除</button>
                    </div>
                  )}
                </div>
                <div className="font-semibold text-slate-900 mb-1">{r.name}</div>
                <div className="text-xs text-slate-500 mb-4">更新于 {r.update}</div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                  <div><div className="text-[10px] text-slate-500">投递</div><div className="text-sm font-bold text-slate-900">{r.usedBy}</div></div>
                  <div><div className="text-[10px] text-slate-500">面试</div><div className="text-sm font-bold text-indigo-600">{r.interviews}</div></div>
                  <div><div className="text-[10px] text-slate-500">Offer</div><div className="text-sm font-bold text-emerald-600">{r.offers}</div></div>
                </div>
                <div className="mt-3 text-xs">
                  <span className="text-slate-500">面试转化 </span>
                  <span className={`font-semibold ${passRate > 50 ? 'text-emerald-600' : 'text-amber-600'}`}>{passRate}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ===== 面经复盘 =====
  const InterviewsView = () => {
    const handleDelete = (id) => {
      if (confirm('确认删除这条面经记录?')) {
        setInterviewList(interviewList.filter(i => i.id !== id));
        showGlobalToast('✅ 已删除面经记录');
      }
    };
    return (
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">面经复盘</h1>
            <p className="text-sm text-slate-500 mt-1">记录面试问题,沉淀经验</p>
          </div>
          <button onClick={() => setShowInterviewModal(true)} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
            <Plus className="w-4 h-4" />新增记录
          </button>
        </div>

        <div className="space-y-3">
          {interviewList.length === 0 && (
            <div className="bg-white border border-dashed border-slate-300 rounded-xl p-8 text-center">
              <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500">还没有面经记录,点击右上角新增第一条</p>
            </div>
          )}
          {interviewList.map(iv => {
            const app = applications.find(a => a.company === iv.company);
            return (
              <div key={iv.id} className="bg-white border border-slate-200 rounded-xl p-5 group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {app ? (
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: app.logoColor }}>{app.logo}</div>
                    ) : (
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-100 text-slate-500 text-sm font-bold">{iv.company[0]}</div>
                    )}
                    <div>
                      <div className="font-semibold text-slate-900">{iv.company} · {iv.round}</div>
                      <div className="text-xs text-slate-500">{iv.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs bg-purple-50 text-purple-700">{iv.questions.length} 题</span>
                    <button onClick={() => handleDelete(iv.id)} className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-red-50 rounded">
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1"><BookOpen className="w-3 h-3" />面试题</div>
                  <div className="space-y-1">
                    {iv.questions.map((q, i) => (
                      <div key={i} className="flex gap-2 text-sm text-slate-700">
                        <span className="text-slate-400 flex-shrink-0">{i + 1}.</span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="text-xs font-medium text-amber-900 mb-1 flex items-center gap-1"><Lightbulb className="w-3 h-3" />复盘反思</div>
                  <div className="text-xs text-amber-800">{iv.reflection}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ===== 心态记录 =====
  const MoodView = () => {
    const moodEmojis = [
      { v: 1, emoji: '😫', label: '很糟' },
      { v: 2, emoji: '😔', label: '低落' },
      { v: 3, emoji: '😐', label: '一般' },
      { v: 4, emoji: '🙂', label: '不错' },
      { v: 5, emoji: '😄', label: '很棒' },
    ];
    const handleSaveMood = () => {
      if (!moodToday) { showGlobalToast('⚠️ 请先选择一个心情表情'); return; }
      const today = '4-18';
      const existingIdx = moodHistory.findIndex(m => m.date === today);
      const newEntry = { date: today, mood: moodToday, note: moodNote || '今日心情', trigger: '' };
      if (existingIdx >= 0) {
        const updated = [...moodHistory];
        updated[existingIdx] = newEntry;
        setMoodHistory(updated);
      } else {
        setMoodHistory([...moodHistory.slice(-6), newEntry]);
      }
      setMoodToday(null);
      setMoodNote('');
      showGlobalToast('✅ 今日心情已保存');
    };
    const goodDays = moodHistory.filter(d => d.mood >= 4).length;
    const avgMood = moodHistory.length > 0 ? (moodHistory.reduce((s, d) => s + d.mood, 0) / moodHistory.length).toFixed(1) : 0;
    const moodValues = moodHistory.map(d => d.mood);
    const maxSwing = moodValues.length > 1 ? Math.max(...moodValues) - Math.min(...moodValues) : 0;
    return (
      <div className="p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">心态记录</h1>
          <p className="text-sm text-slate-500 mt-1">求职路上,照顾好自己的情绪也很重要</p>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 rounded-xl p-6">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Heart className="w-4 h-4 text-rose-500" />今日打卡 · 4月18日</h3>
          <div className="flex items-center justify-between mb-4">
            {moodEmojis.map(m => (
              <button key={m.v} onClick={() => setMoodToday(m.v)} className={`flex flex-col items-center gap-1 p-3 rounded-xl transition ${moodToday === m.v ? 'bg-white shadow-md scale-110' : 'hover:bg-white/50'}`}>
                <span className="text-3xl">{m.emoji}</span>
                <span className="text-xs text-slate-600">{m.label}</span>
              </button>
            ))}
          </div>
          <textarea value={moodNote} onChange={e => setMoodNote(e.target.value)} placeholder="今天发生了什么?记录一下..." className="w-full p-3 bg-white/70 border border-rose-200 rounded-lg text-sm resize-none focus:outline-none focus:border-rose-400" rows={2} />
          <button onClick={handleSaveMood} className="mt-3 px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600 transition">保存今日心情</button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold text-slate-900 mb-4">近7天心态曲线</h3>
          <div className="flex items-end gap-3 h-40 mb-4">
            {moodHistory.map((d, i) => {
              const height = (d.mood / 5) * 100;
              const color = d.mood >= 4 ? '#10B981' : d.mood >= 3 ? '#F59E0B' : '#EF4444';
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex-1 bg-slate-50 rounded-lg relative flex items-end overflow-hidden">
                    <div className="w-full rounded-lg transition-all" style={{ height: `${height}%`, backgroundColor: color }} />
                    {d.trigger && <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] bg-white px-1 rounded shadow-sm whitespace-nowrap">{d.trigger === 'Offer' ? '🎉' : d.trigger === '面试通过' ? '✅' : '💔'}</div>}
                  </div>
                  <span className="text-xs text-slate-500">{d.date}</span>
                </div>
              );
            })}
          </div>
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="text-xs font-medium text-slate-500 mb-2">近期事件关联</div>
            {moodHistory.filter(d => d.trigger).length > 0 ? moodHistory.filter(d => d.trigger).map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">{d.date}</span>
                <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700">{d.trigger}</span>
                <span className="text-slate-600">{d.note}</span>
              </div>
            )) : <div className="text-xs text-slate-400">暂无关联事件</div>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2"><Smile className="w-4 h-4 text-emerald-500" /><span className="text-xs font-medium text-slate-600">好心情天数</span></div>
            <div className="text-2xl font-bold text-emerald-600">{goodDays} <span className="text-sm font-normal text-slate-400">/ {moodHistory.length}天</span></div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2"><Meh className="w-4 h-4 text-amber-500" /><span className="text-xs font-medium text-slate-600">平均心情</span></div>
            <div className="text-2xl font-bold text-amber-600">{avgMood} <span className="text-sm font-normal text-slate-400">/ 5</span></div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2"><Sparkles className="w-4 h-4 text-indigo-500" /><span className="text-xs font-medium text-slate-600">情绪波动</span></div>
            <div className="text-2xl font-bold text-indigo-600">{maxSwing} <span className="text-sm font-normal text-slate-400">档</span></div>
          </div>
        </div>
      </div>
    );
  };

  // ===== 邮件扫描 =====
  const EmailsView = () => {
    const filtered = emails.filter(e => {
      if (emailFilter === 'all') return true;
      if (emailFilter === 'rescued') return e.rescued;
      if (emailFilter === 'unread') return e.unread;
      return e.type === emailFilter;
    });
    return (
      <div className="p-6 space-y-5">
        {emailToast && <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm shadow-lg">{emailToast}</div>}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2"><Mail className="w-6 h-6 text-indigo-600" />邮件智能扫描</h1>
            <p className="text-sm text-slate-500 mt-1">AI自动识别关键邮件,垃圾箱巡检不漏信</p>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 rounded-lg text-xs text-emerald-700">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />扫描中 · 4个邮箱已连接
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="font-semibold text-slate-900 mb-3">已接入邮箱</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: 'QQ邮箱', account: 'user@qq.com', count: 4, color: '#06B6D4' },
              { name: 'Gmail', account: 'user@gmail.com', count: 2, color: '#EF4444' },
              { name: '163邮箱', account: 'user@163.com', count: 1, color: '#DC2626' },
              { name: '学校邮箱', account: 'xxx@pku.edu.cn', count: 1, color: '#8B5CF6' },
            ].map((m, i) => (
              <div key={i} className="border border-slate-100 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: m.color + '20' }}><Mail className="w-3 h-3" style={{ color: m.color }} /></div>
                  <span className="text-sm font-medium text-slate-900">{m.name}</span>
                </div>
                <div className="text-[10px] text-slate-500 mb-1.5">{m.account}</div>
                <div className="text-xs text-slate-600"><span className="font-semibold text-slate-900">{m.count}</span> 封关键邮件</div>
              </div>
            ))}
            <button onClick={() => showEmailToast('🔐 OAuth授权:原型中暂不接入真实邮箱')} className="border border-dashed border-slate-300 rounded-lg p-3 text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition text-xs flex items-center justify-center gap-1">
              <Plus className="w-3.5 h-3.5" />添加邮箱
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center"><Trash2 className="w-5 h-5 text-amber-700" /></div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-amber-900">🎯 从垃圾箱捞出 {emails.filter(e => e.rescued).length} 封重要招聘邮件</div>
              <div className="text-xs text-amber-800 mt-0.5">AI检测到这些邮件被误判,包含 {emails.filter(e => e.rescued).map(e => e.company).join('、')} 的关键信息</div>
            </div>
            <button onClick={() => { setEmailFilter('rescued'); showEmailToast('已切换到垃圾箱捞回视图'); }} className="px-3 py-1.5 bg-amber-600 text-white rounded-lg text-xs font-medium hover:bg-amber-700">查看详情</button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'all', name: '全部', count: emails.length },
            { id: 'unread', name: '未读', count: emails.filter(e => e.unread).length },
            { id: 'rescued', name: '垃圾箱捞回', count: emails.filter(e => e.rescued).length },
            { id: '面试邀约', name: '面试邀约', count: emails.filter(e => e.type === '面试邀约').length },
            { id: '笔试通知', name: '笔试通知', count: emails.filter(e => e.type === '笔试通知').length },
            { id: 'Offer', name: 'Offer', count: emails.filter(e => e.type === 'Offer').length },
            { id: '拒信', name: '拒信', count: emails.filter(e => e.type === '拒信').length },
          ].map(f => (
            <button key={f.id} onClick={() => setEmailFilter(f.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${emailFilter === f.id ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'}`}>
              {f.name} <span className="opacity-70">({f.count})</span>
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map(email => {
            const p = processedEmails[email.id] || {};
            return (
              <div key={email.id} className={`bg-white border rounded-xl p-4 hover:shadow-sm transition ${email.unread ? 'border-indigo-200' : 'border-slate-200'}`}>
                <div className="flex items-start gap-3">
                  {email.unread && <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ backgroundColor: typeColors[email.type]?.bg || '#F1F5F9', color: typeColors[email.type]?.text || '#475569' }}>{email.type}</span>
                      {email.rescued && <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] bg-amber-100 text-amber-800"><Trash2 className="w-2.5 h-2.5" />垃圾箱捞回</span>}
                      {email.newCompany && !p.created && <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-100 text-purple-800">🆕 未录入公司</span>}
                      {p.created && <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800">✓ 已创建申请</span>}
                      {email.priority === 'urgent' && <span className="px-1.5 py-0.5 rounded text-[10px] bg-red-100 text-red-800">紧急</span>}
                      <span className="text-[10px] text-slate-400">{email.mailbox} · {email.time}</span>
                    </div>
                    <div className={`text-sm mb-1 ${email.unread ? 'font-semibold text-slate-900' : 'text-slate-700'}`}>{email.subject}</div>
                    <div className="text-xs text-slate-500 mb-2">来自 {email.from} · 关于 {email.company}</div>
                    {email.extracted && (
                      <div className="bg-indigo-50 rounded-lg p-2.5 mb-2">
                        <div className="text-[10px] font-medium text-indigo-700 mb-1 flex items-center gap-1"><Sparkles className="w-3 h-3" />AI已提取日程信息</div>
                        <div className="text-xs text-slate-700 space-y-0.5">
                          <div>📅 {email.extracted.date}</div>
                          <div>📍 {email.extracted.location}</div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      {email.extracted && (
                        <button onClick={() => handleAddToCalendar(email)} disabled={p.calendar} className={`text-xs px-2.5 py-1 rounded transition ${p.calendar ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                          {p.calendar ? '✓ 已加入日历' : '加入日历'}
                        </button>
                      )}
                      {email.newCompany && (
                        <button onClick={() => handleCreateApp(email)} disabled={p.created} className={`text-xs px-2.5 py-1 rounded transition ${p.created ? 'bg-emerald-100 text-emerald-700 cursor-default' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
                          {p.created ? '✓ 已创建' : '新建申请记录'}
                        </button>
                      )}
                      <button onClick={() => setViewingEmail(email)} className="text-xs px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-50">查看原文</button>
                      {!email.newCompany && ['面试邀约', '笔试通知', 'Offer', '拒信'].includes(email.type) && (
                        <button onClick={() => handleUpdateEmailStatus(email)} disabled={p.statusUpdated} className={`text-xs px-2.5 py-1 border rounded transition ${p.statusUpdated ? 'border-emerald-200 bg-emerald-50 text-emerald-700 cursor-default' : 'border-slate-200 hover:bg-slate-50'}`}>
                          {p.statusUpdated ? '✓ 状态已更新' : '更新状态'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // ===== Modals =====
  const AddModal = () => {
    const isEdit = !!editingApp;
    const [form, setForm] = useState(editingApp ? { ...editingApp } : {
      company: '', position: '', location: '', deadline: '', status: '投递', resumeVersion: '产品版V3', salary: '', notes: ''
    });
    const close = () => { setShowAddModal(false); setEditingApp(null); };
    const handleSubmit = () => {
      if (!form.company || !form.position) { showGlobalToast('⚠️ 请填写公司和岗位'); return; }
      if (isEdit) {
        setApplications(applications.map(a => a.id === editingApp.id ? { ...form } : a));
        showGlobalToast('✅ 申请已更新');
      } else {
        const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
        setApplications([...applications, {
          ...form,
          id: applications.length + 1,
          logo: form.company[0],
          logoColor: colors[applications.length % colors.length],
          priority: 'medium'
        }]);
        showGlobalToast('✅ 申请已创建');
      }
      close();
    };
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={close}>
        <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">{isEdit ? '编辑申请记录' : '新增申请记录'}</h2>
            <button onClick={close}><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-600 mb-1 block">公司 *</label>
                <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="如:字节跳动" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
              </div>
              <div>
                <label className="text-xs text-slate-600 mb-1 block">岗位 *</label>
                <input value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} placeholder="如:产品经理" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-600 mb-1 block">地点</label>
                <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="如:北京" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
              </div>
              <div>
                <label className="text-xs text-slate-600 mb-1 block">截止日期</label>
                <input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-600 mb-1 block">当前状态</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400">
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600 mb-1 block">简历版本</label>
                <select value={form.resumeVersion} onChange={e => setForm({ ...form, resumeVersion: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400">
                  {resumeList.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-1 block">薪资</label>
              <input value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} placeholder="如:20-30K" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-1 block">备注</label>
              <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="任何相关信息..." rows={2} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-indigo-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <button onClick={close} className="flex-1 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">取消</button>
            <button onClick={handleSubmit} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">{isEdit ? '保存修改' : '创建申请'}</button>
          </div>
        </div>
      </div>
    );
  };

  const InterviewModal = () => {
    const [form, setForm] = useState({ company: '', round: '一面', date: '2026-04-18', questionsText: '', reflection: '' });
    const handleSubmit = () => {
      if (!form.company || !form.questionsText) { showGlobalToast('⚠️ 请填写公司和面试题'); return; }
      const questions = form.questionsText.split('\n').map(q => q.trim()).filter(Boolean);
      setInterviewList([{ id: Date.now(), company: form.company, round: form.round, date: form.date, questions, reflection: form.reflection || '暂无反思' }, ...interviewList]);
      setShowInterviewModal(false);
      showGlobalToast('✅ 面经记录已添加');
    };
    const rounds = ['一面', '二面', '三面', '终面', '群面', '笔试', 'HR面'];
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowInterviewModal(false)}>
        <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">新增面经记录</h2>
            <button onClick={() => setShowInterviewModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-600 mb-1 block">公司 *</label>
                <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="如:字节跳动" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
              </div>
              <div>
                <label className="text-xs text-slate-600 mb-1 block">轮次</label>
                <select value={form.round} onChange={e => setForm({ ...form, round: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400">
                  {rounds.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-1 block">面试日期</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-1 block">面试题 * <span className="text-slate-400">(每行一题)</span></label>
              <textarea value={form.questionsText} onChange={e => setForm({ ...form, questionsText: e.target.value })} placeholder={"自我介绍\n项目经验分享\n对行业的理解..."} rows={5} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-1 block">复盘反思</label>
              <textarea value={form.reflection} onChange={e => setForm({ ...form, reflection: e.target.value })} placeholder="哪里答得好?哪里需要改进?" rows={2} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:border-indigo-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <button onClick={() => setShowInterviewModal(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">取消</button>
            <button onClick={handleSubmit} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">保存</button>
          </div>
        </div>
      </div>
    );
  };

  const ResumeModal = () => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#6366F1');
    const colors = ['#6366F1', '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#DC2626'];
    const handleCreate = () => {
      if (!name.trim()) { showGlobalToast('⚠️ 请输入版本名称'); return; }
      if (resumeList.some(r => r.name === name)) { showGlobalToast('⚠️ 该版本名称已存在'); return; }
      setResumeList([...resumeList, { name, usedBy: 0, interviews: 0, offers: 0, color, update: '刚刚' }]);
      setShowResumeModal(false);
      showGlobalToast('✅ 简历版本已创建');
    };
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowResumeModal(false)}>
        <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">新建简历版本</h2>
            <button onClick={() => setShowResumeModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-600 mb-1 block">版本名称 *</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="如:产品版V4 / 金融版V5" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
              <p className="text-[10px] text-slate-400 mt-1">建议命名格式:方向版+版本号,便于区分</p>
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-2 block">标签颜色</label>
              <div className="flex items-center gap-2 flex-wrap">
                {colors.map(c => (
                  <button key={c} onClick={() => setColor(c)} className={`w-8 h-8 rounded-lg transition ${color === c ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : ''}`} style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-500 bg-indigo-50 rounded-lg p-2.5 flex items-start gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <span>创建后,在「新增申请」时可以选择这个版本,系统会自动统计它的投递/面试/Offer数据</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-5">
            <button onClick={() => setShowResumeModal(false)} className="flex-1 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">取消</button>
            <button onClick={handleCreate} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">创建</button>
          </div>
        </div>
      </div>
    );
  };

  const ResumeDetailModal = () => {
    const r = viewingResume;
    const companiesUsing = applications.filter(a => a.resumeVersion === r.name);
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setViewingResume(null)}>
        <div className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ backgroundColor: r.color + '20' }}>
                <FileText className="w-5 h-5" style={{ color: r.color }} />
              </div>
              <div>
                <div className="font-bold text-slate-900">{r.name}</div>
                <div className="text-xs text-slate-500">更新于 {r.update}</div>
              </div>
            </div>
            <button onClick={() => setViewingResume(null)}><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-slate-50 rounded-lg p-3 text-center"><div className="text-[10px] text-slate-500 mb-1">投递</div><div className="text-xl font-bold text-slate-900">{r.usedBy}</div></div>
            <div className="bg-slate-50 rounded-lg p-3 text-center"><div className="text-[10px] text-slate-500 mb-1">面试</div><div className="text-xl font-bold text-indigo-600">{r.interviews}</div></div>
            <div className="bg-slate-50 rounded-lg p-3 text-center"><div className="text-[10px] text-slate-500 mb-1">Offer</div><div className="text-xl font-bold text-emerald-600">{r.offers}</div></div>
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500 mb-2">使用该简历的公司</div>
            {companiesUsing.length > 0 ? (
              <div className="space-y-1">
                {companiesUsing.map(app => (
                  <div key={app.id} className="flex items-center gap-2 p-2 border border-slate-100 rounded-lg">
                    <div className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: app.logoColor }}>{app.logo}</div>
                    <span className="text-sm text-slate-900 flex-1">{app.company}</span>
                    <span className="text-[10px] text-slate-500">{app.position}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: statusColors[app.status].bg, color: statusColors[app.status].text }}>{app.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400 text-center py-4 bg-slate-50 rounded-lg">暂无申请使用此版本</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const WatchModal = () => {
    const [input, setInput] = useState('');
    const current = ['字节跳动', '腾讯', '美团', '阿里巴巴', '小红书', '京东'];
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowWatchModal(false)}>
        <div className="bg-white rounded-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-900">管理关注公司</h2>
            <button onClick={() => setShowWatchModal(false)}><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-600 mb-1 block">添加公司</label>
              <div className="flex gap-2">
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="输入公司名,如:华为" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400" />
                <button onClick={() => { if (input.trim()) { showGlobalToast(`✅ 已关注「${input}」,将每日抓取其新增岗位`); setInput(''); } }} className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">添加</button>
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-600 mb-2">当前关注 ({current.length})</div>
              <div className="flex flex-wrap gap-2">
                {current.map(c => (
                  <div key={c} className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs">
                    <span>{c}</span>
                    <button onClick={() => showGlobalToast(`已取消关注「${c}」(原型演示)`)} className="hover:text-red-500"><X className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-500 bg-amber-50 rounded-lg p-2.5 flex items-start gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <span>实际产品中,添加关注后会对接该公司官方招聘站 + 牛客/BOSS等平台,每日定时抓取新增岗位</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CompanyJobsModal = () => {
    const c = viewingCompanyJobs;
    const sampleJobs = [
      { title: '产品经理-推荐算法', location: '北京', salary: '25-40K', time: '2小时前' },
      { title: '高级产品经理-电商', location: '上海', salary: '35-50K', time: '昨天' },
      { title: '产品经理-协作工具', location: '北京', salary: '30-45K', time: '2天前' },
      { title: '数据产品经理', location: '深圳', salary: '28-40K', time: '3天前' },
      { title: '产品运营-本地生活', location: '北京', salary: '20-30K', time: '4天前' },
    ];
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setViewingCompanyJobs(null)}>
        <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: c.color }}>{c.logo}</div>
              <div>
                <div className="font-bold text-slate-900">{c.company}</div>
                <div className="text-xs text-slate-500">近7日新增 {c.newJobs} 个岗位 · 匹配你的 {c.matched} 个</div>
              </div>
            </div>
            <button onClick={() => setViewingCompanyJobs(null)}><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          <div className="space-y-2">
            {sampleJobs.slice(0, Math.max(c.matched || 3, 3)).map((job, i) => (
              <div key={i} className="border border-slate-100 rounded-lg p-3 hover:border-indigo-200 hover:bg-indigo-50/30 transition">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="text-sm font-medium text-slate-900">{job.title}</div>
                  <span className="text-[10px] text-slate-400">{job.time}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
                  <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{job.location}</span>
                  <span>{job.salary}</span>
                </div>
                <button onClick={() => {
                  setApplications([...applications, { id: applications.length + 1, company: c.company, logo: c.logo, logoColor: c.color, position: job.title, location: job.location, deadline: '2026-05-15', status: '投递', priority: 'medium', resumeVersion: '产品版V3', salary: job.salary, notes: `来自${c.company}新岗位推送` }]);
                  showGlobalToast(`✅ 已加入申请列表`);
                }} className="text-xs px-2.5 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">加入申请列表</button>
              </div>
            ))}
          </div>
          <div className="mt-3 text-xs text-slate-400 bg-slate-50 rounded-lg p-2 text-center">原型演示数据 · 实际会展示完整岗位列表</div>
        </div>
      </div>
    );
  };

  const EmailDetailModal = () => {
    const e = viewingEmail;
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setViewingEmail(null)}>
        <div className="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto" onClick={ev => ev.stopPropagation()}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ backgroundColor: typeColors[e.type]?.bg || '#F1F5F9', color: typeColors[e.type]?.text || '#475569' }}>{e.type}</span>
                  <span className="text-[10px] text-slate-400">{e.mailbox} · {e.time}</span>
                </div>
                <h2 className="text-base font-bold text-slate-900">{e.subject}</h2>
                <div className="text-xs text-slate-500 mt-1">发件人:{e.from}</div>
              </div>
              <button onClick={() => setViewingEmail(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="border-t border-slate-100 pt-4 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
{`${e.company.replace('(未录入)', '')}人力资源部

您好:

感谢您关注${e.company.replace('(未录入)', '')},并投递我们的岗位。经过初步筛选,我们希望邀请您参加${e.type === '面试邀约' ? '面试' : e.type === '笔试通知' ? '在线笔试' : '后续流程'}。

${e.extracted ? `时间:${e.extracted.date}\n地点/链接:${e.extracted.location}` : ''}

请您提前做好准备,如有时间冲突请及时与我们联系。

期待您的加入。

${e.company.replace('(未录入)', '')}招聘团队`}
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">⚠️ 原型展示,实际会接入邮件服务器读取真实内容</div>
          </div>
        </div>
      </div>
    );
  };

  const DetailDrawer = () => {
    const currentIdx = statusOptions.indexOf(selectedApp.status);
    const updateStatus = (newStatus) => {
      setApplications(applications.map(a => a.id === selectedApp.id ? { ...a, status: newStatus } : a));
      setSelectedApp({ ...selectedApp, status: newStatus });
    };
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40" onClick={() => setSelectedApp(null)}>
        <div className="absolute right-0 top-0 bottom-0 w-[480px] bg-white shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
          <div className="p-6">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold" style={{ backgroundColor: selectedApp.logoColor }}>{selectedApp.logo}</div>
                <div>
                  <div className="font-bold text-slate-900">{selectedApp.company}</div>
                  <div className="text-sm text-slate-500">{selectedApp.position}</div>
                </div>
              </div>
              <button onClick={() => setSelectedApp(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="mb-5">
              <div className="text-xs font-medium text-slate-500 mb-2">申请进度</div>
              <div className="flex items-center gap-1">
                {statusOptions.slice(0, 6).map((s, i) => {
                  const done = i <= currentIdx;
                  const isCurrent = i === currentIdx;
                  return (
                    <React.Fragment key={s}>
                      <button onClick={() => updateStatus(s)} className={`flex-1 py-1.5 rounded text-xs transition ${isCurrent ? 'bg-indigo-600 text-white font-medium' : done ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>{s}</button>
                      {i < 5 && <ArrowRight className="w-3 h-3 text-slate-300 flex-shrink-0" />}
                    </React.Fragment>
                  );
                })}
              </div>
              <button onClick={() => updateStatus('拒信')} className={`mt-2 w-full py-1.5 rounded text-xs transition ${selectedApp.status === '拒信' ? 'bg-red-100 text-red-700 font-medium' : 'bg-slate-50 text-slate-500 hover:bg-red-50'}`}>标记为拒信</button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-lg"><div className="text-xs text-slate-500 mb-1">地点</div><div className="text-sm font-medium text-slate-900 flex items-center gap-1"><MapPin className="w-3 h-3" />{selectedApp.location}</div></div>
                <div className="p-3 bg-slate-50 rounded-lg"><div className="text-xs text-slate-500 mb-1">截止日期</div><div className="text-sm font-medium text-slate-900 flex items-center gap-1"><Calendar className="w-3 h-3" />{selectedApp.deadline}</div></div>
                <div className="p-3 bg-slate-50 rounded-lg"><div className="text-xs text-slate-500 mb-1">简历版本</div><div className="text-sm font-medium text-slate-900">{selectedApp.resumeVersion}</div></div>
                <div className="p-3 bg-slate-50 rounded-lg"><div className="text-xs text-slate-500 mb-1">薪资</div><div className="text-sm font-medium text-slate-900">{selectedApp.salary}</div></div>
              </div>

              {selectedApp.notes && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="text-xs font-medium text-amber-900 mb-1">备注</div>
                  <div className="text-sm text-amber-800">{selectedApp.notes}</div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-100">
                <div className="text-xs font-medium text-slate-500 mb-2">快捷操作</div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => { setEditingApp(selectedApp); setShowAddModal(true); setSelectedApp(null); }} className="p-2 border border-slate-200 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1">
                    <Edit3 className="w-3.5 h-3.5" />编辑
                  </button>
                  <button onClick={() => { setActiveView('interviews'); setShowInterviewModal(true); setSelectedApp(null); showGlobalToast(`📝 为「${selectedApp.company}」添加面经`); }} className="p-2 border border-slate-200 rounded-lg text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />添加面经
                  </button>
                  <button onClick={() => { if (confirm(`确认删除「${selectedApp.company}」的申请?`)) { setApplications(applications.filter(a => a.id !== selectedApp.id)); setSelectedApp(null); showGlobalToast('✅ 已删除申请记录'); } }} className="p-2 border border-red-200 rounded-lg text-xs text-red-600 hover:bg-red-50 flex items-center justify-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" />删除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ===== 主渲染 =====
  return (
    <div className="flex h-screen bg-slate-50" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif' }}>
      {globalToast && <div className="fixed top-6 right-6 z-[60] bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm shadow-lg">{globalToast}</div>}
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <UrgentBanner />
        <div className="flex-1 overflow-y-auto">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'applications' && <ApplicationsView />}
          {activeView === 'funnel' && <FunnelView />}
          {activeView === 'calendar' && <CalendarView />}
          {activeView === 'resumes' && <ResumesView />}
          {activeView === 'interviews' && <InterviewsView />}
          {activeView === 'mood' && <MoodView />}
          {activeView === 'emails' && <EmailsView />}
        </div>
      </div>
      {showAddModal && <AddModal />}
      {showInterviewModal && <InterviewModal />}
      {showResumeModal && <ResumeModal />}
      {viewingResume && <ResumeDetailModal />}
      {showWatchModal && <WatchModal />}
      {viewingCompanyJobs && <CompanyJobsModal />}
      {viewingEmail && <EmailDetailModal />}
      {selectedApp && <DetailDrawer />}
    </div>
  );
}