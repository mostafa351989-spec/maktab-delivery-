import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('الكل')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
    
    // تحديث مباشر لما يجي طلب جديد
    const channel = supabase
      .channel('orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, 
        () => fetchOrders()
      )
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  const fetchOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) setOrders(data)
    setLoading(false)
  }

  const updateStatus = async (id, newStatus) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', id)
    fetchOrders()
  }

  const deleteOrder = async (id) => {
    if (confirm('متأكد من حذف الطلب؟')) {
      await supabase.from('orders').delete().eq('id', id)
      fetchOrders()
    }
  }

  const filteredOrders = filter === 'الكل' 
    ? orders 
    : orders.filter(o => o.status === filter)

  const stats = {
    total: orders.length,
    new: orders.filter(o => o.status === 'جديد').length,
    done: orders.filter(o => o.status === 'تم التوصيل').length
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: '20px',
      fontFamily: 'Cairo, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(90deg, #10b981, #3b82f6, #f97316)',
          padding: '30px',
          borderRadius: '15px',
          color: 'white',
          marginBottom: '30px'
        }}>
          <h1 style={{ fontSize: '32px', margin: 0 }}>لوحة تحكم مكتب التوصيل 📦</h1>
          <p style={{ margin: '10px 0 0', opacity: 0.9 }}>إدارة كل الطلبات من مكان واحد</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'white', padding: '25px', borderRadius: '15px', borderTop: '4px solid #3b82f6' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>إجمالي الطلبات</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#3b82f6' }}>{stats.total}</div>
          </div>
          <div style={{ background: 'white', padding: '25px', borderRadius: '15px', borderTop: '4px solid #f97316' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>طلبات جديدة</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#f97316' }}>{stats.new}</div>
          </div>
          <div style={{ background: 'white', padding: '25px', borderRadius: '15px', borderTop: '4px solid #10b981' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>تم التوصيل</div>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981' }}>{stats.done}</div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['الكل', 'جديد', 'قيد التنفيذ', 'تم التوصيل', 'ملغي'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '8px',
                  background: filter === s ? '#3b82f6' : '#e5e7eb',
                  color: filter === s ? 'white' : '#333',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>جاري التحميل...</div>
        ) : filteredOrders.length === 0 ? (
          <div style={{ background: 'white', padding: '50px', borderRadius: '15px', textAlign: 'center', color: '#666' }}>
            مفيش طلبات {filter !== 'الكل' && `بالحالة "${filter}"`}
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {filteredOrders.map(order => (
              <div key={order.id} style={{
                background: 'white',
                padding: '20px',
                borderRadius: '15px',
                borderRight: `5px solid ${
                  order.status === 'جديد' ? '#f97316' :
                  order.status === 'قيد التنفيذ' ? '#3b82f6' :
                  order.status === 'تم التوصيل' ? '#10b981' : '#ef4444'
                }`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#111' }}>{order.customer_name}</div>
                    <div style={{ color: '#666', fontSize: '14px' }}>📱 {order.phone}</div>
                  </div>
                  <div style={{
                    padding: '8px 15px',
                    borderRadius: '20px',
                    background: order.status === 'جديد' ? '#fef3c7' :
                               order.status === 'قيد التنفيذ' ? '#dbeafe' :
                               order.status === 'تم التوصيل' ? '#d1fae5' : '#fee2e2',
                    color: order.status === 'جديد' ? '#92400e' :
                           order.status === 'قيد التنفيذ' ? '#1e40af' :
                           order.status === 'تم التوصيل' ? '#065f46' : '#991b1b',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}>
                    {order.status}
                  </div>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>📍 العنوان:</div>
                  <div style={{ color: '#111' }}>{order.address}</div>
                </div>

                {order.notes && (
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>📝 ملاحظات:</div>
                    <div style={{ color: '#111' }}>{order.notes}</div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={{
                      padding: '8px 15px',
                      borderRadius: '8px',
                      border: '2px solid #e5e7eb',
                      cursor: 'pointer'
                    }}
                  >
                    <option>جديد</option>
                    <option>قيد التنفيذ</option>
                    <option>تم التوصيل</option>
                    <option>ملغي</option>
                  </select>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    style={{
                      padding: '8px 15px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a href="/" style={{ color: '#3b82f6', textDecoration: 'none' }}>← العودة لصفحة الطلبات</a>
        </div>
      </div>
    </div>
  )
}
