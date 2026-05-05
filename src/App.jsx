import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://nirfuougrlvurkaxmvyv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pcmZ1b3VncGx2dXJrYXhtdnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYzNjI5NzksImV4cCI6MjAzMTkzODk3OX0.0g8bZ1xV5Q5qZ1xV5Q5qZ1xV5Q5qZ1xV5Q5qZ1xV5Q5q'
)

function App() {
  const [orders, setOrders] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    getOrders()
    const channel = supabase.channel('orders').on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, getOrders).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  async function getOrders() {
    const { data } = await supabase.from('orders').select('*').order('id', { ascending: false })
    setOrders(data || [])
  }

  async function addOrder() {
    if (!name || !phone || !address) { alert('اكتب كل البيانات'); return }
    await supabase.from('orders').insert({ customer_name: name, phone, address, status: 'جديد' })
    setName(''); setPhone(''); setAddress('')
  }

  async function updateStatus(id, status) {
    await supabase.from('orders').update({ status }).eq('id', id)
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', direction: 'rtl', backgroundColor: '#0f172a', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{ textAlign: 'center', color: '#a78bfa' }}>🚚 مكتب توصيل</h1>
      
      <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', maxWidth: '500px', margin: '20px auto' }}>
        <input placeholder="اسم العميل" value={name} onChange={e => setName(e.target.value)} style={{ margin: '8px 0', padding: '12px', width: '100%', boxSizing: 'border-box', backgroundColor: '#334155', border: 'none', borderRadius: '5px', color: '#fff' }} />
        <input placeholder="رقم الموبايل" value={phone} onChange={e => setPhone(e.target.value)} style={{ margin: '8px 0', padding: '12px', width: '100%', boxSizing: 'border-box', backgroundColor: '#334155', border: 'none', borderRadius: '5px', color: '#fff' }} />
        <input placeholder="تفاصيل العنوان" value={address} onChange={e => setAddress(e.target.value)} style={{ margin: '8px 0', padding: '12px', width: '100%', boxSizing: 'border-box', backgroundColor: '#334155', border: 'none', borderRadius: '5px', color: '#fff' }} />
        <button onClick={addOrder} style={{ margin: '8px 0', padding: '12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', width: '100%', fontSize: '18px' }}>
          تسجيل الطلب
        </button>
      </div>

      <h2 style={{ textAlign: 'center' }}>الطلبات: {orders.length}</h2>
      
      {orders.map(o => (
        <div key={o.id} style={{ border: '1px solid #334155', margin: '15px auto', padding: '15px', borderRadius: '10px', backgroundColor: '#1e293b', maxWidth: '500px' }}>
          <h3>👤 {o.customer_name}</h3>
          <p>📱 {o.phone}</p>
          <p>📍 {o.address}</p>
          <p>الحالة: <b>{o.status}</b></p>
          {o.status === 'جديد' && <button onClick={() => updateStatus(o.id, 'جاري التوصيل')} style={{ padding: '10px', backgroundColor: '#f59e0b', border: 'none', borderRadius: '5px', width: '100%' }}>بدء التوصيل</button>}
          {o.status === 'جاري التوصيل' && <button onClick={() => updateStatus(o.id, 'تم التسليم')} style={{ padding: '10px', backgroundColor: '#10b981', border: 'none', borderRadius: '5px', width: '100%', color: 'white' }}>تم التسليم</button>}
        </div>
      ))}
    </div>
  )
}

export default App
