import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function OrderForm() {
  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    address: '',
    ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase
      .from('orders')
      .insert([{
        ...form,
        status: 'جديد',
        created_at: new Date()
      }])
    
    setLoading(false)
    if (!error) {
      setSuccess(true)
      setForm({ customer_name: '', phone: '', address: '', '' })
      setTimeout(() => setSuccess(false), 3000)
    } else {
      alert('حصل خطأ: ' + error.message)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #f97316 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Cairo, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#10b981',
          fontSize: '32px',
          marginBottom: '10px'
        }}>مكتب التوصيل</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          سجل طلبك وهيتم التواصل معاك فوراً
        </p>

        {success && (
          <div style={{
            background: '#10b981',
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ✅ تم تسجيل طلبك بنجاح! هنكلمك حالاً
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 'bold' }}>
              الاسم بالكامل
            </label>
            <input
              type="text"
              required
              value={form.customer_name}
              onChange={(e) => setForm({...form, customer_name: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none',
                transition: '0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 'bold' }}>
              رقم الموبايل
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 'bold' }}>
              العنوان بالتفصيل
            </label>
            <textarea
              required
              value={form.address}
              onChange={(e) => setForm({...form, address: e.target.value})}
              rows="3"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none',
                resize: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 'bold' }}>
              ملاحظات إضافية
            </label>
            <textarea
              onChange={(e) => setForm({...form, e.target.value})}
              rows="2"
              placeholder="اختياري"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                fontSize: '16px',
                outline: 'none',
                resize: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              background: loading ? '#9ca3af' : 'linear-gradient(90deg, #10b981, #3b82f6)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: '0.3s'
            }}
          >
            {loading ? 'جاري التسجيل...' : 'تسجيل الطلب 🚀'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/admin" style={{ color: '#f97316', textDecoration: 'none', fontSize: '14px' }}>
            دخول لوحة التحكم
          </a>
        </div>
      </div>
    </div>
  )
}
