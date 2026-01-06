import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Wallet,
  Plus,
  Send,
  QrCode,
  Smartphone,
  CreditCard,
  Gift,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Filter,
  ChevronRight,
  Scan,
  Building2,
  IndianRupee,
  Sparkles
} from 'lucide-react'

// Mock transaction data
const transactions = [
  { id: 1, type: 'credit', title: 'Sold: Old Electronics', amount: 1500, date: '2025-12-29', status: 'completed' },
  { id: 2, type: 'debit', title: 'Purchase: Recycled Bag', amount: 299, date: '2025-12-28', status: 'completed' },
  { id: 3, type: 'credit', title: 'Eco Points Reward', amount: 100, date: '2025-12-27', status: 'completed' },
  { id: 4, type: 'debit', title: 'Wallet Recharge', amount: 500, date: '2025-12-25', status: 'completed' },
  { id: 5, type: 'credit', title: 'Donation Cashback', amount: 50, date: '2025-12-24', status: 'completed' }
]

const quickActions = [
  { id: 'scan', label: 'Scan & Pay', icon: QrCode, color: '#22c55e' },
  { id: 'send', label: 'Send Money', icon: Send, color: '#3b82f6' },
  { id: 'recharge', label: 'Recharge', icon: Smartphone, color: '#8b5cf6' },
  { id: 'cards', label: 'Cards', icon: CreditCard, color: '#f59e0b' }
]

const rewards = [
  { title: '10% Cashback', subtitle: 'On first purchase', expires: '3 days left', code: 'ECO10' },
  { title: 'Free Delivery', subtitle: 'Orders above ₹500', expires: '7 days left', code: 'FREESHIP' }
]

function WalletPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [addAmount, setAddAmount] = useState('')

  const walletBalance = user?.walletBalance || 2500
  const ecoCoins = user?.ecoScore || 1250

  const quickAmounts = [100, 200, 500, 1000, 2000]

  return (
    <div className="wallet-page">
      <div className="container">
        {/* Wallet Card */}
        <div className="wallet-card">
          <div className="wallet-header">
            <div className="wallet-icon">
              <Wallet size={32} />
            </div>
            <div className="wallet-info">
              <span className="wallet-label">Wallet Balance</span>
              <h1 className="wallet-balance">
                <IndianRupee size={32} />
                {walletBalance.toLocaleString()}
              </h1>
            </div>
            <button 
              className="add-money-btn"
              onClick={() => setShowAddMoney(true)}
            >
              <Plus size={18} />
              Add Money
            </button>
          </div>

          <div className="wallet-extras">
            <div className="extra-item">
              <Coins size={20} />
              <span>{ecoCoins} Eco Coins</span>
            </div>
            <div className="extra-item">
              <Gift size={20} />
              <span>2 Rewards Available</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          {quickActions.map(action => (
            <button key={action.id} className="quick-action">
              <div className="action-icon" style={{ background: action.color }}>
                <action.icon size={24} />
              </div>
              <span>{action.label}</span>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="wallet-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button 
            className={`tab ${activeTab === 'rewards' ? 'active' : ''}`}
            onClick={() => setActiveTab('rewards')}
          >
            Rewards
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="tab-content animate-fadeIn">
            {/* Recent Transactions */}
            <div className="section-card card">
              <div className="section-header">
                <h3>Recent Transactions</h3>
                <button className="view-all" onClick={() => setActiveTab('transactions')}>
                  View All <ChevronRight size={16} />
                </button>
              </div>

              <div className="transactions-list">
                {transactions.slice(0, 3).map(tx => (
                  <div key={tx.id} className="transaction-item">
                    <div className={`tx-icon ${tx.type}`}>
                      {tx.type === 'credit' ? (
                        <ArrowDownLeft size={18} />
                      ) : (
                        <ArrowUpRight size={18} />
                      )}
                    </div>
                    <div className="tx-details">
                      <span className="tx-title">{tx.title}</span>
                      <span className="tx-date">{tx.date}</span>
                    </div>
                    <span className={`tx-amount ${tx.type}`}>
                      {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Rewards */}
            <div className="section-card card">
              <div className="section-header">
                <h3>Available Rewards</h3>
                <button className="view-all" onClick={() => setActiveTab('rewards')}>
                  View All <ChevronRight size={16} />
                </button>
              </div>

              <div className="rewards-list">
                {rewards.map((reward, index) => (
                  <div key={index} className="reward-item">
                    <div className="reward-info">
                      <Sparkles size={20} className="reward-icon" />
                      <div>
                        <span className="reward-title">{reward.title}</span>
                        <span className="reward-subtitle">{reward.subtitle}</span>
                      </div>
                    </div>
                    <div className="reward-meta">
                      <span className="reward-code">{reward.code}</span>
                      <span className="reward-expires">{reward.expires}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="tab-content animate-fadeIn">
            <div className="transactions-card card">
              <div className="transactions-header">
                <h3>All Transactions</h3>
                <button className="filter-btn">
                  <Filter size={18} />
                  Filter
                </button>
              </div>

              <div className="transactions-list full">
                {transactions.map(tx => (
                  <div key={tx.id} className="transaction-item">
                    <div className={`tx-icon ${tx.type}`}>
                      {tx.type === 'credit' ? (
                        <ArrowDownLeft size={18} />
                      ) : (
                        <ArrowUpRight size={18} />
                      )}
                    </div>
                    <div className="tx-details">
                      <span className="tx-title">{tx.title}</span>
                      <span className="tx-date">{tx.date}</span>
                    </div>
                    <div className="tx-meta">
                      <span className={`tx-amount ${tx.type}`}>
                        {tx.type === 'credit' ? '+' : '-'}₹{tx.amount}
                      </span>
                      <span className="tx-status">{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="tab-content animate-fadeIn">
            <div className="rewards-card card">
              <h3>Your Rewards</h3>
              <p className="text-muted">Use these codes during checkout</p>

              <div className="rewards-grid">
                {rewards.map((reward, index) => (
                  <div key={index} className="reward-card">
                    <div className="reward-icon-lg">
                      <Gift size={32} />
                    </div>
                    <h4>{reward.title}</h4>
                    <p>{reward.subtitle}</p>
                    <div className="reward-code-box">
                      <span>{reward.code}</span>
                      <button className="copy-btn">Copy</button>
                    </div>
                    <span className="expires-text">{reward.expires}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add Money Modal */}
        {showAddMoney && (
          <div className="modal-backdrop" onClick={() => setShowAddMoney(false)}>
            <div className="modal card animate-scaleIn" onClick={e => e.stopPropagation()}>
              <h2>Add Money to Wallet</h2>
              
              <div className="amount-input-group">
                <span className="currency">₹</span>
                <input
                  type="number"
                  placeholder="0"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                />
              </div>

              <div className="quick-amounts">
                {quickAmounts.map(amt => (
                  <button
                    key={amt}
                    className={`quick-amt ${addAmount === amt.toString() ? 'selected' : ''}`}
                    onClick={() => setAddAmount(amt.toString())}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="payment-methods">
                <h4>Payment Method</h4>
                <button className="method-btn">
                  <Building2 size={20} />
                  <span>UPI / Bank</span>
                  <ChevronRight size={16} />
                </button>
                <button className="method-btn">
                  <CreditCard size={20} />
                  <span>Debit / Credit Card</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <button 
                className="btn btn-primary w-full btn-lg"
                disabled={!addAmount}
              >
                Add ₹{addAmount || 0}
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .wallet-page {
          padding: var(--space-6) 0 var(--space-16);
        }

        .wallet-card {
          background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
          border-radius: var(--radius-2xl);
          padding: var(--space-8);
          color: white;
          margin-bottom: var(--space-8);
        }

        .wallet-header {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }

        .wallet-icon {
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wallet-info {
          flex: 1;
        }

        .wallet-label {
          font-size: var(--text-sm);
          opacity: 0.9;
        }

        .wallet-balance {
          display: flex;
          align-items: center;
          font-size: var(--text-4xl);
          color: white;
          margin: 0;
        }

        .add-money-btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-5);
          background: white;
          color: var(--color-primary);
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .add-money-btn:hover {
          transform: scale(1.05);
        }

        .wallet-extras {
          display: flex;
          gap: var(--space-6);
        }

        .extra-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-size: var(--text-sm);
          opacity: 0.9;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-8);
        }

        @media (max-width: 600px) {
          .quick-actions {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .quick-action {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          transition: all var(--transition-fast);
        }

        .quick-action:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .action-icon {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .quick-action span {
          font-size: var(--text-sm);
          font-weight: 500;
        }

        .wallet-tabs {
          display: flex;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
        }

        .tab {
          padding: var(--space-3) var(--space-6);
          border-radius: var(--radius-full);
          font-weight: 600;
          color: var(--color-text-secondary);
          background: var(--color-gray-100);
          transition: all var(--transition-fast);
        }

        .tab:hover {
          color: var(--color-primary);
        }

        .tab.active {
          background: var(--color-primary);
          color: white;
        }

        .section-card {
          margin-bottom: var(--space-6);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }

        .section-header h3 {
          margin: 0;
        }

        .view-all {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-size: var(--text-sm);
          color: var(--color-primary);
          font-weight: 500;
        }

        .transactions-list {
          display: flex;
          flex-direction: column;
        }

        .transaction-item {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4) 0;
          border-bottom: 1px solid var(--color-border);
        }

        .transaction-item:last-child {
          border-bottom: none;
        }

        .tx-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tx-icon.credit {
          background: rgba(34, 197, 94, 0.1);
          color: var(--color-success);
        }

        .tx-icon.debit {
          background: rgba(239, 68, 68, 0.1);
          color: var(--color-error);
        }

        .tx-details {
          flex: 1;
        }

        .tx-title {
          display: block;
          font-weight: 500;
        }

        .tx-date {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .tx-amount {
          font-weight: 700;
          font-size: var(--text-lg);
        }

        .tx-amount.credit {
          color: var(--color-success);
        }

        .tx-amount.debit {
          color: var(--color-error);
        }

        .tx-meta {
          text-align: right;
        }

        .tx-status {
          display: block;
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
          text-transform: capitalize;
        }

        .rewards-list {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .reward-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--space-4);
          background: var(--color-gray-50);
          border-radius: var(--radius-lg);
        }

        .reward-info {
          display: flex;
          align-items: center;
          gap: var(--space-3);
        }

        .reward-icon {
          color: var(--color-accent);
        }

        .reward-title {
          display: block;
          font-weight: 600;
        }

        .reward-subtitle {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
        }

        .reward-meta {
          text-align: right;
        }

        .reward-code {
          display: block;
          font-weight: 700;
          color: var(--color-primary);
        }

        .reward-expires {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .transactions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-4);
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          background: var(--color-gray-100);
          border-radius: var(--radius-lg);
          font-size: var(--text-sm);
        }

        .rewards-card h3 {
          margin-bottom: var(--space-2);
        }

        .rewards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
          margin-top: var(--space-6);
        }

        @media (max-width: 600px) {
          .rewards-grid {
            grid-template-columns: 1fr;
          }
        }

        .reward-card {
          text-align: center;
          padding: var(--space-6);
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(234, 179, 8, 0.05));
          border: 1px solid var(--color-accent);
          border-radius: var(--radius-xl);
        }

        .reward-icon-lg {
          width: 64px;
          height: 64px;
          background: var(--color-accent);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto var(--space-4);
        }

        .reward-card h4 {
          margin-bottom: var(--space-1);
        }

        .reward-card p {
          font-size: var(--text-sm);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-4);
        }

        .reward-code-box {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2);
          background: white;
          border: 2px dashed var(--color-accent);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-2);
        }

        .reward-code-box span {
          font-weight: 700;
          font-family: monospace;
          font-size: var(--text-lg);
        }

        .copy-btn {
          padding: var(--space-1) var(--space-2);
          background: var(--color-accent);
          color: white;
          border-radius: var(--radius-sm);
          font-size: var(--text-xs);
        }

        .expires-text {
          font-size: var(--text-xs);
          color: var(--color-text-secondary);
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: var(--z-modal);
          padding: var(--space-4);
        }

        .modal {
          width: 100%;
          max-width: 400px;
          padding: var(--space-8);
        }

        .modal h2 {
          text-align: center;
          margin-bottom: var(--space-6);
        }

        .amount-input-group {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-6);
        }

        .amount-input-group .currency {
          font-size: var(--text-4xl);
          font-weight: 700;
          color: var(--color-text-secondary);
        }

        .amount-input-group input {
          width: 150px;
          font-size: var(--text-4xl);
          font-weight: 700;
          border: none;
          text-align: center;
          outline: none;
        }

        .quick-amounts {
          display: flex;
          justify-content: center;
          gap: var(--space-2);
          margin-bottom: var(--space-6);
          flex-wrap: wrap;
        }

        .quick-amt {
          padding: var(--space-2) var(--space-4);
          border: 2px solid var(--color-border);
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: all var(--transition-fast);
        }

        .quick-amt:hover,
        .quick-amt.selected {
          border-color: var(--color-primary);
          background: var(--color-primary-50);
          color: var(--color-primary);
        }

        .payment-methods {
          margin-bottom: var(--space-6);
        }

        .payment-methods h4 {
          margin-bottom: var(--space-3);
        }

        .method-btn {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          width: 100%;
          padding: var(--space-4);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          margin-bottom: var(--space-2);
          transition: all var(--transition-fast);
        }

        .method-btn:hover {
          border-color: var(--color-primary);
          background: var(--color-primary-50);
        }

        .method-btn span {
          flex: 1;
          text-align: left;
        }
      `}</style>
    </div>
  )
}

export default WalletPage
