import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: 'Cairo, sans-serif'
    }}>
      {/* الهيدر */}
      <div style={{
        background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #f97316 100%)',
        padding: '60px 20px 80px',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', margin: '0 0 15px', fontWeight: 'bold' }}>
            مكتب التوصيل السريع 📦
          </h1>
          <p style={{ fontSize: '20px', opacity: 0.95, marginBottom: '40px' }}>
            خدمة توصيل سريعة وموثوقة - نضمن وصول طلبك بأمان وفي الوقت المناسب
          </p>
          <Link to="/order" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'white',
              color: '#10b981',
              padding: '18px 45px',
              borderRadius: '50px',
              border: 'none',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              transition: '0.3s'
            }}>
              اطلب دلوقتي 🚀
            </button>
          </Link>
        </div>
      </div>

      {/* كروت المميزات */}
      <div style={{ maxWidth: '1200px', margin: '-40px auto 60px', padding: '0 20px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '25px' 
        }}>
          {/* كارت طلب جديد */}
          <Link to="/order" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white',
              padding: '35px',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              borderTop: '5px solid #10b981',
              cursor: 'pointer',
              transition: '0.3s',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '15px' }}>📝</div>
              <h3 style={{ color: '#10b981', fontSize: '24px', margin: '0 0 10px' }}>سجل طلب جديد</h3>
              <p style={{ color: '#666', margin: 0 }}>املأ بياناتك وهنكلمك فوراً لتأكيد الطلب</p>
            </div>
          </Link>

          {/* كارت لوحة التحكم */}
          <Link to="/admin" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white',
              padding: '35px',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
              borderTop: '5px solid #3b82f6',
              cursor: 'pointer',
              transition: '0.3s',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '15px' }}>📊</div>
              <h3 style={{ color: '#3b82f6', fontSize: '24px', margin: '0 0 10px' }}>لوحة التحكم</h3>
              <p style={{ color: '#666', margin: 0 }}>تابع كل الطلبات والحالات من مكان واحد</p>
            </div>
          </Link>

          {/* كارت العروض */}
          <div style={{
            background: 'white',
            padding: '35px',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            borderTop: '5px solid #f97316',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>🔥</div>
            <h3 style={{ color: '#f97316', fontSize: '24px', margin: '0 0 10px' }}>عروض التوصيل</h3>
            <p style={{ color: '#666', margin: 0 }}>توصيل مجاني للطلبات فوق 200 جنيه</p>
          </div>
        </div>
      </div>

      {/* قسم ليه احنا */}
      <div style={{ background: 'white', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', color: '#111', marginBottom: '50px' }}>ليه تختارنا؟</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '40px' 
          }}>
            <div>
              <div style={{ 
                width: '80px', height: '80px', 
                background: 'linear-gradient(135deg, #10b981, #3b82f6)',
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '35px'
              }}>⚡</div>
              <h3 style={{ color: '#111', marginBottom: '10px' }}>سرعة فائقة</h3>
              <p style={{ color: '#666' }}>نغطي مناطق واسعة مع التزام كامل بالمواعيد</p>
            </div>
            <div>
              <div style={{ 
                width: '80px', height: '80px', 
                background: 'linear-gradient(135deg, #3b82f6, #f97316)',
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '35px'
              }}>💰</div>
              <h3 style={{ color: '#111', marginBottom: '10px' }}>أسعار مناسبة</h3>
              <p style={{ color: '#666' }}>أرخص سعر توصيل مع جودة عالية</p>
            </div>
            <div>
              <div style={{ 
                width: '80px', height: '80px', 
                background: 'linear-gradient(135deg, #f97316, #10b981)',
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '35px'
              }}>📱</div>
              <h3 style={{ color: '#111', marginBottom: '10px' }}>تتبع مباشر</h3>
              <p style={{ color: '#666' }}>اعرف حالة طلبك لحظة بلحظة</p>
            </div>
          </div>
        </div>
      </div>

      {/* الفوتر */}
      <div style={{
        background: '#111827',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0 0 10px', fontSize: '18px' }}>مكتب التوصيل السريع</p>
        <p style={{ margin: 0, opacity: 0.7 }}>📞 01000000000 | 📍 الإسكندرية</p>
      </div>
    </div>
  )
}
