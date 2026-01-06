import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Building2,
  CreditCard,
  Smartphone,
  Plus,
  Trash2,
  Check,
  Shield,
  Link2,
  Wallet,
  AlertCircle,
  ChevronRight,
  Eye,
  EyeOff,
  X,
  CheckCircle,
  Loader
} from 'lucide-react'

// Mock bank data
const mockBanks = [
  { id: 1, name: 'State Bank of India', code: 'SBI', icon: '🏦' },
  { id: 2, name: 'HDFC Bank', code: 'HDFC', icon: '🏛️' },
  { id: 3, name: 'ICICI Bank', code: 'ICICI', icon: '🏢' },
  { id: 4, name: 'Axis Bank', code: 'AXIS', icon: '🏤' },
  { id: 5, name: 'Kotak Mahindra Bank', code: 'KOTAK', icon: '🏦' }
]

function BankPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('bank')
  const [showAddBank, setShowAddBank] = useState(false)
  const [showAddUPI, setShowAddUPI] = useState(false)
  const [showVerifyOTP, setShowVerifyOTP] = useState(false)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [showAccountNumber, setShowAccountNumber] = useState({})
  
  // Mock saved accounts
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bankName: 'State Bank of India',
      bankCode: 'SBI',
      accountNumber: '1234567890123456',
      ifsc: 'SBIN0001234',
      accountHolder: user?.fullName || 'Eco Warrior',
      isPrimary: true,
      verified: true
    }
  ])
  
  const [upiIds, setUpiIds] = useState([
    { id: 1, upiId: 'ecowarrior@sbi', isPrimary: true, verified: true }
  ])
  
  const [newBank, setNewBank] = useState({
    bankName: '',
    bankCode: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifsc: '',
    accountHolder: user?.fullName || ''
  })
  
  const [newUPI, setNewUPI] = useState('')
  
  const handleAddBank = async (e) => {
    e.preventDefault()
    if (newBank.accountNumber !== newBank.confirmAccountNumber) {
      alert('Account numbers do not match!')
      return
    }
    setShowVerifyOTP(true)
  }
  
  const handleVerifyOTP = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newAccount = {
      id: Date.now(),
      bankName: newBank.bankName,
      bankCode: newBank.bankCode,
      accountNumber: newBank.accountNumber,
      ifsc: newBank.ifsc,
      accountHolder: newBank.accountHolder,
      isPrimary: bankAccounts.length === 0,
      verified: true
    }
    
    setBankAccounts([...bankAccounts, newAccount])
    setShowAddBank(false)
    setShowVerifyOTP(false)
    setOtp(['', '', '', '', '', ''])
    setNewBank({
      bankName: '',
      bankCode: '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifsc: '',
      accountHolder: user?.fullName || ''
    })
    setLoading(false)
  }
  
  const handleAddUPI = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setUpiIds([...upiIds, {
      id: Date.now(),
      upiId: newUPI,
      isPrimary: upiIds.length === 0,
      verified: true
    }])
    
    setNewUPI('')
    setShowAddUPI(false)
    setLoading(false)
  }
  
  const handleRemoveBank = (id) => {
    setBankAccounts(bankAccounts.filter(acc => acc.id !== id))
  }
  
  const handleRemoveUPI = (id) => {
    setUpiIds(upiIds.filter(upi => upi.id !== id))
  }
  
  const setPrimaryBank = (id) => {
    setBankAccounts(bankAccounts.map(acc => ({
      ...acc,
      isPrimary: acc.id === id
    })))
  }
  
  const setPrimaryUPI = (id) => {
    setUpiIds(upiIds.map(upi => ({
      ...upi,
      isPrimary: upi.id === id
    })))
  }
  
  const maskAccountNumber = (number) => {
    return '••••' + number.slice(-4)
  }
  
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  return (
    <div className="bank-page">
      <div className="page-container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">
            <Building2 size={28} />
            Bank & UPI
          </h1>
          <p className="page-subtitle">Manage your payment methods securely</p>
        </div>

        {/* Wallet Link Card */}
        <div className="wallet-link-card">
          <div className="wallet-link-info">
            <div className="wallet-icon">
              <Wallet size={24} />
            </div>
            <div>
              <h3>Eco Wallet Balance</h3>
              <p className="wallet-balance">₹{(2450).toLocaleString()}</p>
            </div>
          </div>
          <button className="btn-link-wallet">
            <Link2 size={18} />
            Link to Bank
          </button>
        </div>

        {/* Tabs */}
        <div className="bank-tabs">
          <button 
            className={`tab-btn ${activeTab === 'bank' ? 'active' : ''}`}
            onClick={() => setActiveTab('bank')}
          >
            <Building2 size={18} />
            Bank Accounts
          </button>
          <button 
            className={`tab-btn ${activeTab === 'upi' ? 'active' : ''}`}
            onClick={() => setActiveTab('upi')}
          >
            <Smartphone size={18} />
            UPI IDs
          </button>
        </div>

        {/* Bank Accounts Tab */}
        {activeTab === 'bank' && (
          <div className="accounts-section">
            <div className="section-header">
              <h2>Saved Bank Accounts</h2>
              <button className="btn-add" onClick={() => setShowAddBank(true)}>
                <Plus size={18} />
                Add Bank
              </button>
            </div>

            {bankAccounts.length === 0 ? (
              <div className="empty-state">
                <Building2 size={48} className="empty-icon" />
                <h3>No Bank Accounts</h3>
                <p>Add a bank account to receive payments</p>
                <button className="btn-primary" onClick={() => setShowAddBank(true)}>
                  <Plus size={18} />
                  Add Bank Account
                </button>
              </div>
            ) : (
              <div className="accounts-list">
                {bankAccounts.map(account => (
                  <div key={account.id} className={`account-card ${account.isPrimary ? 'primary' : ''}`}>
                    <div className="account-header">
                      <div className="bank-logo">
                        {account.bankCode}
                      </div>
                      <div className="account-info">
                        <h3>{account.bankName}</h3>
                        <div className="account-number">
                          {showAccountNumber[account.id] 
                            ? account.accountNumber 
                            : maskAccountNumber(account.accountNumber)
                          }
                          <button 
                            className="btn-icon"
                            onClick={() => setShowAccountNumber({
                              ...showAccountNumber,
                              [account.id]: !showAccountNumber[account.id]
                            })}
                          >
                            {showAccountNumber[account.id] ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        <p className="ifsc">IFSC: {account.ifsc}</p>
                      </div>
                      {account.isPrimary && (
                        <span className="primary-badge">
                          <Check size={12} />
                          Primary
                        </span>
                      )}
                    </div>
                    
                    <div className="account-footer">
                      <div className="account-holder">
                        <span className="label">Account Holder:</span>
                        <span>{account.accountHolder}</span>
                      </div>
                      <div className="account-actions">
                        {!account.isPrimary && (
                          <button 
                            className="btn-text"
                            onClick={() => setPrimaryBank(account.id)}
                          >
                            Set as Primary
                          </button>
                        )}
                        <button 
                          className="btn-delete"
                          onClick={() => handleRemoveBank(account.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {account.verified && (
                      <div className="verified-badge">
                        <Shield size={14} />
                        Verified
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* UPI Tab */}
        {activeTab === 'upi' && (
          <div className="accounts-section">
            <div className="section-header">
              <h2>Saved UPI IDs</h2>
              <button className="btn-add" onClick={() => setShowAddUPI(true)}>
                <Plus size={18} />
                Add UPI
              </button>
            </div>

            {upiIds.length === 0 ? (
              <div className="empty-state">
                <Smartphone size={48} className="empty-icon" />
                <h3>No UPI IDs</h3>
                <p>Add a UPI ID for instant payments</p>
                <button className="btn-primary" onClick={() => setShowAddUPI(true)}>
                  <Plus size={18} />
                  Add UPI ID
                </button>
              </div>
            ) : (
              <div className="upi-list">
                {upiIds.map(upi => (
                  <div key={upi.id} className={`upi-card ${upi.isPrimary ? 'primary' : ''}`}>
                    <div className="upi-icon">
                      <Smartphone size={24} />
                    </div>
                    <div className="upi-info">
                      <h3>{upi.upiId}</h3>
                      {upi.verified && (
                        <span className="verified-text">
                          <CheckCircle size={14} />
                          Verified
                        </span>
                      )}
                    </div>
                    {upi.isPrimary && (
                      <span className="primary-badge">
                        <Check size={12} />
                        Primary
                      </span>
                    )}
                    <div className="upi-actions">
                      {!upi.isPrimary && (
                        <button 
                          className="btn-text"
                          onClick={() => setPrimaryUPI(upi.id)}
                        >
                          Set Primary
                        </button>
                      )}
                      <button 
                        className="btn-delete"
                        onClick={() => handleRemoveUPI(upi.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Security Info */}
        <div className="security-info">
          <Shield size={20} />
          <div>
            <h4>Your data is secure</h4>
            <p>All payment information is encrypted with bank-grade security</p>
          </div>
        </div>
      </div>

      {/* Add Bank Modal */}
      {showAddBank && (
        <div className="modal-overlay" onClick={() => !showVerifyOTP && setShowAddBank(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{showVerifyOTP ? 'Verify Account' : 'Add Bank Account'}</h2>
              <button className="btn-close" onClick={() => {
                setShowAddBank(false)
                setShowVerifyOTP(false)
              }}>
                <X size={24} />
              </button>
            </div>

            {!showVerifyOTP ? (
              <form onSubmit={handleAddBank} className="bank-form">
                <div className="form-group">
                  <label>Select Bank</label>
                  <select 
                    value={newBank.bankCode}
                    onChange={(e) => {
                      const bank = mockBanks.find(b => b.code === e.target.value)
                      setNewBank({
                        ...newBank,
                        bankCode: e.target.value,
                        bankName: bank?.name || ''
                      })
                    }}
                    required
                  >
                    <option value="">Choose your bank</option>
                    {mockBanks.map(bank => (
                      <option key={bank.id} value={bank.code}>
                        {bank.icon} {bank.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Account Number</label>
                  <input
                    type="text"
                    placeholder="Enter account number"
                    value={newBank.accountNumber}
                    onChange={(e) => setNewBank({...newBank, accountNumber: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Account Number</label>
                  <input
                    type="text"
                    placeholder="Re-enter account number"
                    value={newBank.confirmAccountNumber}
                    onChange={(e) => setNewBank({...newBank, confirmAccountNumber: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>IFSC Code</label>
                  <input
                    type="text"
                    placeholder="e.g., SBIN0001234"
                    value={newBank.ifsc}
                    onChange={(e) => setNewBank({...newBank, ifsc: e.target.value.toUpperCase()})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Account Holder Name</label>
                  <input
                    type="text"
                    placeholder="Name as per bank records"
                    value={newBank.accountHolder}
                    onChange={(e) => setNewBank({...newBank, accountHolder: e.target.value})}
                    required
                  />
                </div>

                <div className="form-info">
                  <AlertCircle size={16} />
                  <span>We'll send ₹1 to verify your account</span>
                </div>

                <button type="submit" className="btn-primary btn-full">
                  <Check size={18} />
                  Verify & Add Account
                </button>
              </form>
            ) : (
              <div className="otp-verification">
                <div className="otp-icon">
                  <Shield size={48} />
                </div>
                <h3>Enter OTP</h3>
                <p>We've sent a 6-digit OTP to your registered mobile number</p>
                
                <div className="otp-inputs">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="otp-input"
                    />
                  ))}
                </div>

                <button 
                  className="btn-primary btn-full"
                  onClick={handleVerifyOTP}
                  disabled={loading || otp.join('').length < 6}
                >
                  {loading ? (
                    <>
                      <Loader size={18} className="spinner" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      Verify OTP
                    </>
                  )}
                </button>

                <button className="btn-text resend">
                  Resend OTP
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add UPI Modal */}
      {showAddUPI && (
        <div className="modal-overlay" onClick={() => setShowAddUPI(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add UPI ID</h2>
              <button className="btn-close" onClick={() => setShowAddUPI(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddUPI} className="upi-form">
              <div className="form-group">
                <label>UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@bank"
                  value={newUPI}
                  onChange={(e) => setNewUPI(e.target.value)}
                  required
                />
              </div>

              <div className="upi-suggestions">
                <p>Suggested UPI formats:</p>
                <div className="suggestion-chips">
                  <button type="button" onClick={() => setNewUPI(`${user?.fullName?.toLowerCase().replace(' ', '')}@sbi`)}>
                    @sbi
                  </button>
                  <button type="button" onClick={() => setNewUPI(`${user?.fullName?.toLowerCase().replace(' ', '')}@hdfc`)}>
                    @hdfc
                  </button>
                  <button type="button" onClick={() => setNewUPI(`${user?.fullName?.toLowerCase().replace(' ', '')}@paytm`)}>
                    @paytm
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-primary btn-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader size={18} className="spinner" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Add UPI ID
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .bank-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding: 2rem;
        }

        .page-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .wallet-link-card {
          background: linear-gradient(135deg, var(--eco-primary), var(--eco-secondary));
          border-radius: 1rem;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          color: white;
        }

        .wallet-link-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .wallet-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wallet-link-info h3 {
          font-size: 0.9rem;
          opacity: 0.9;
          margin-bottom: 0.25rem;
        }

        .wallet-balance {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .btn-link-wallet {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-link-wallet:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .bank-tabs {
          display: flex;
          gap: 0.5rem;
          background: var(--bg-secondary);
          padding: 0.5rem;
          border-radius: 1rem;
          margin-bottom: 1.5rem;
        }

        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.875rem 1rem;
          border: none;
          background: transparent;
          color: var(--text-secondary);
          font-weight: 600;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: var(--bg-primary);
          color: var(--eco-primary);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .btn-add {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.625rem 1rem;
          background: var(--eco-primary);
          color: white;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-add:hover {
          background: var(--eco-secondary);
        }

        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          background: var(--bg-secondary);
          border-radius: 1rem;
        }

        .empty-icon {
          color: var(--text-tertiary);
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .empty-state p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .accounts-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .account-card {
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 1.25rem;
          position: relative;
          border: 2px solid transparent;
          transition: all 0.2s;
        }

        .account-card.primary {
          border-color: var(--eco-primary);
        }

        .account-header {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .bank-logo {
          width: 48px;
          height: 48px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: var(--eco-primary);
          font-size: 0.75rem;
        }

        .account-info {
          flex: 1;
        }

        .account-info h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .account-number {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-family: monospace;
          font-size: 0.9rem;
        }

        .ifsc {
          color: var(--text-tertiary);
          font-size: 0.8rem;
          margin-top: 0.25rem;
        }

        .primary-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: var(--eco-primary);
          color: white;
          padding: 0.25rem 0.625rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .account-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-color);
        }

        .account-holder {
          font-size: 0.85rem;
        }

        .account-holder .label {
          color: var(--text-tertiary);
          margin-right: 0.5rem;
        }

        .account-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-text {
          background: none;
          border: none;
          color: var(--eco-primary);
          font-weight: 600;
          cursor: pointer;
          padding: 0.5rem;
        }

        .btn-delete {
          background: none;
          border: none;
          color: var(--error);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s;
        }

        .btn-delete:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        .btn-icon {
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          padding: 0.25rem;
        }

        .verified-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--eco-primary);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .upi-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .upi-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 1.25rem;
          border: 2px solid transparent;
        }

        .upi-card.primary {
          border-color: var(--eco-primary);
        }

        .upi-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #5f259f, #8247e5);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .upi-info {
          flex: 1;
        }

        .upi-info h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .verified-text {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: var(--eco-primary);
          font-size: 0.8rem;
        }

        .upi-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .security-info {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: rgba(16, 185, 129, 0.1);
          padding: 1rem;
          border-radius: 0.75rem;
          margin-top: 2rem;
        }

        .security-info svg {
          color: var(--eco-primary);
          flex-shrink: 0;
        }

        .security-info h4 {
          font-size: 0.9rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .security-info p {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          background: var(--bg-primary);
          border-radius: 1.5rem;
          max-width: 450px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-header h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .btn-close {
          background: none;
          border: none;
          color: var(--text-tertiary);
          cursor: pointer;
          padding: 0.25rem;
        }

        .bank-form, .upi-form {
          padding: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .form-group input, .form-group select {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid var(--border-color);
          border-radius: 0.75rem;
          font-size: 1rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
          transition: all 0.2s;
        }

        .form-group input:focus, .form-group select:focus {
          outline: none;
          border-color: var(--eco-primary);
        }

        .form-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
        }

        .btn-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          background: var(--eco-primary);
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          background: var(--eco-secondary);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-full {
          width: 100%;
        }

        .otp-verification {
          padding: 2rem;
          text-align: center;
        }

        .otp-icon {
          width: 80px;
          height: 80px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: var(--eco-primary);
        }

        .otp-verification h3 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .otp-verification p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .otp-inputs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .otp-input {
          width: 48px;
          height: 56px;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 700;
          border: 2px solid var(--border-color);
          border-radius: 0.75rem;
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .otp-input:focus {
          outline: none;
          border-color: var(--eco-primary);
        }

        .resend {
          margin-top: 1rem;
          color: var(--text-secondary);
        }

        .upi-suggestions {
          margin-bottom: 1.5rem;
        }

        .upi-suggestions p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }

        .suggestion-chips {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .suggestion-chips button {
          padding: 0.5rem 1rem;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 2rem;
          color: var(--text-secondary);
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .suggestion-chips button:hover {
          border-color: var(--eco-primary);
          color: var(--eco-primary);
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .bank-page {
            padding: 1rem;
          }

          .wallet-link-card {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .wallet-link-info {
            flex-direction: column;
          }

          .account-header {
            flex-wrap: wrap;
          }

          .account-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .otp-input {
            width: 40px;
            height: 48px;
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  )
}

export default BankPage
