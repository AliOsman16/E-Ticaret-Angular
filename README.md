# 🛒 E-Ticaret Projesi

Modern ve kullanıcı dostu bir e-ticaret platformu. Angular 20 ve Nx monorepo teknolojileri kullanılarak geliştirilmiştir. Angular öğrenme amacıyla backend kullanmadan json-server ile geliştirilmiştir. Gelecek güncellemelerle ve backend ile uygulama daha da gelişecektir.

## 📋 İçindekiler

- [Proje Hakkında](#proje-hakkında)
- [Teknolojiler](#teknolojiler)
- [Proje Yapısı](#proje-yapısı)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Özellikler](#özellikler)
- [API Endpoints](#api-endpoints)

## 🎯 Proje Hakkında

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş kapsamlı bir e-ticaret platformudur. Müşteri arayüzü (UI) ve yönetici paneli (Admin) olmak üzere iki ana uygulamadan oluşur.

### 🏗️ Mimari Yapı

- **Monorepo**: Nx workspace ile organize edilmiş
- **Frontend**: Angular 20 ile geliştirilmiş
- **Backend**: JSON Server ile mock API
- **State Management**: Angular Signals ve Services
- **UI Components**: Özel geliştirilmiş bileşenler

## 🛠️ Teknolojiler

### Core Technologies
- **Angular** 20.0.0
- **TypeScript** 5.8.2
- **Nx** 21.2.2 (Monorepo Management)
- **RxJS** 7.8.0

### UI & UX Libraries
- **Flexi Grid** 20.0.0 - Grid sistemi
- **Flexi Select** 20.0.13 - Select bileşenleri
- **Flexi Toast** 20.0.2 - Bildirim sistemi
- **ngx-infinite-scroll** 20.0.0 - Sonsuz kaydırma
- **ngx-mask** 19.0.7 - Input maskeleme
- **tr-currency** 20.0.0 - Türk Lirası formatı

### Development Tools
- **ESLint** - Kod kalitesi
- **Prettier** - Kod formatı
- **SWC** - Hızlı derleme

## 📁 Proje Yapısı

```
e-ticaret/
├── apps/
│   ├── ui/                 # Müşteri arayüzü
│   │   ├── src/
│   │   │   ├── pages/      # Sayfa bileşenleri
│   │   │   ├── guards/     # Route korumaları
│   │   │   ├── services/   # Servisler
│   │   │   └── ...
│   │   └── ...
│   └── admin/              # Yönetici paneli
│       ├── src/
│       │   ├── pages/      # Admin sayfaları
│       │   ├── components/ # Admin bileşenleri
│       │   ├── guards/     # Admin korumaları
│       │   ├── services/   # Admin servisleri
│       │   └── ...
│       └── ...
├── library/
│   └── shared/             # Paylaşılan kütüphane
│       ├── src/
│       │   ├── models/     # Veri modelleri
│       │   ├── services/   # Paylaşılan servisler
│       │   ├── interceptors/ # HTTP interceptor'ları
│       │   └── lib/        # Yardımcı fonksiyonlar
│       └── ...
├── db.json                 # Mock API veritabanı
└── ...
```

## 🚀 Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd e-ticaret
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **JSON Server'ı başlatın (Mock API)**
```bash
npx json-server --watch db.json --port 3000
```

4. **Uygulamaları çalıştırın**

**Müşteri Arayüzü (UI):**
```bash
npm run serve ui
# veya
nx serve ui --port 4200
```

**Yönetici Paneli (Admin):**
```bash
npm run serve admin
# veya
nx serve admin --port 4201
```

## 💻 Kullanım

### Müşteri Arayüzü (UI)
- **URL**: http://localhost:4200
- **Özellikler**:
  - Ürün listeleme ve filtreleme
  - Sepet yönetimi
  - Kullanıcı kayıt/giriş
  - Sipariş verme
  - Sipariş takibi

### Yönetici Paneli (Admin)
- **URL**: http://localhost:4201
- **Özellikler**:
  - Ürün yönetimi
  - Kategori yönetimi
  - Kullanıcı yönetimi
  - Sipariş takibi

## ✨ Özellikler

### 🛍️ Müşteri Özellikleri
- **Ürün Katalog**: Kategorilere göre ürün listeleme
- **Arama ve Filtreleme**: Ürün arama ve kategori filtreleme
- **Sepet Yönetimi**: Ürün ekleme, çıkarma, miktar güncelleme
- **Kullanıcı Hesabı**: Kayıt, giriş, profil yönetimi
- **Sipariş Sistemi**: Güvenli ödeme ve sipariş verme
- **Sipariş Takibi**: Geçmiş siparişleri görüntüleme

### 👨‍💼 Yönetici Özellikleri
- **Ürün Yönetimi**: Ürün ekleme, düzenleme, silme
- **Kategori Yönetimi**: Kategori oluşturma ve düzenleme
- **Kullanıcı Yönetimi**: Kullanıcı listesi ve yetki yönetimi
- **Sipariş Yönetimi**: Sipariş durumu güncelleme
- **Stok Takibi**: Ürün stok durumu kontrolü

### 🔧 Teknik Özellikler
- **Responsive Tasarım**: Mobil uyumlu arayüz
- **Lazy Loading**: Sayfa bazlı kod bölümleme
- **Route Guards**: Güvenli sayfa erişimi
- **Error Handling**: Kapsamlı hata yönetimi
- **Form Validation**: Gelişmiş form doğrulama
- **Currency Formatting**: Türk Lirası formatı

## 📡 API Endpoints

Mock API aşağıdaki endpoint'leri sağlar:

### Ürünler
- `GET /products` - Tüm ürünleri listele
- `GET /products/:id` - Belirli ürünü getir
- `POST /products` - Yeni ürün ekle
- `PUT /products/:id` - Ürün güncelle
- `DELETE /products/:id` - Ürün sil

### Kategoriler
- `GET /categories` - Tüm kategorileri listele
- `POST /categories` - Yeni kategori ekle
- `PUT /categories/:id` - Kategori güncelle
- `DELETE /categories/:id` - Kategori sil

### Kullanıcılar
- `GET /users` - Tüm kullanıcıları listele
- `POST /users` - Yeni kullanıcı ekle
- `PUT /users/:id` - Kullanıcı güncelle

### Sepet
- `GET /baskets` - Kullanıcı sepetini getir
- `POST /baskets` - Sepete ürün ekle
- `DELETE /baskets/:id` - Sepetten ürün çıkar

### Siparişler
- `GET /orders` - Tüm siparişleri listele
- `POST /orders` - Yeni sipariş oluştur
- `PUT /orders/:id` - Sipariş durumu güncelle

## 🏗️ Build Komutları

### Production Build
```bash
# UI uygulaması
nx build ui --prod

# Admin uygulaması
nx build admin --prod
```

### Development Build
```bash
# UI uygulaması
nx build ui

# Admin uygulaması
nx build admin
```

### Linting
```bash
# Tüm projeleri lint et
nx lint

# Belirli projeyi lint et
nx lint ui
nx lint admin
```

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
