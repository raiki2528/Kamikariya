// DOM読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // アニメーション効果の初期化
    initAnimations();
    
    // ボタンのイベントリスナー設定
    initButtonEvents();
    
    // ソーシャルリンクのイベントリスナー設定
    initSocialLinks();
    
    // パフォーマンス最適化のための遅延読み込み
    initLazyLoading();
    
    // タッチデバイス対応の初期化
    initTouchSupport();
    
    // レスポンシブ対応の初期化
    initResponsiveSupport();
    
    // スワイプナビゲーションの初期化
    initSwipeNavigation();
    
    // 振動フィードバックの初期化
    initVibrationFeedback();
    
    // バックグラウンド更新の初期化
    initBackgroundUpdate();
});

// アニメーション効果の初期化
function initAnimations() {
    // スクロール時のフェードイン効果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // アニメーション対象要素を監視
    const animatedElements = document.querySelectorAll('.social-link');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ボタンのイベントリスナー設定
function initButtonEvents() {
    const exchangeButton = document.querySelector('.btn-primary');
    const downloadButton = document.querySelector('.btn-secondary');

    // Exchange Contact ボタンのクリックイベント
    if (exchangeButton) {
        exchangeButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // ボタンのアニメーション効果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // 連絡先交換のモーダルまたはアクション
            showContactModal();
        });
    }

    // Download ボタンのクリックイベント
    if (downloadButton) {
        downloadButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // ボタンのアニメーション効果
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // ダウンロード機能（vCard形式など）
            downloadContact();
        });
    }
}

// ソーシャルリンクのイベントリスナー設定
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // リンクのホバー効果
            this.style.transform = 'translateX(8px)';
            setTimeout(() => {
                this.style.transform = 'translateX(4px)';
            }, 200);
        });

        // マウスオーバー効果
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// 連絡先情報表示
function showContactInfo() {
    const contactInfo = `
連絡先情報:
📧 Email: kamikariya@qreat.co.jp
📷 Instagram: @megumi_fpdays
    `.trim();
    
    createCustomModal('Kamikariya Megumi - 連絡先情報', contactInfo);
}

// カスタムモーダル作成
function createCustomModal(title, content) {
    // 既存のモーダルがあれば削除
    const existingModal = document.querySelector('.custom-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // モーダルオーバーレイ
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'custom-modal';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;

    // モーダルコンテンツ
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 16px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        animation: slideUp 0.3s ease;
    `;

    modalContent.innerHTML = `
        <h3 style="color: #ff6b35; margin-bottom: 20px; font-size: 24px;">${title}</h3>
        <div style="white-space: pre-line; line-height: 1.8; color: #333; margin-bottom: 30px;">${content}</div>
        <button onclick="this.closest('.custom-modal').remove()" 
                style="background: #ff6b35; color: white; border: none; padding: 12px 24px; 
                       border-radius: 8px; cursor: pointer; font-weight: 600;">
            閉じる
        </button>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // オーバーレイクリックで閉じる
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
        }
    });

    // CSS アニメーション追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// 画像をBase64に変換する関数（修正版）
function getImageAsBase64(imagePath) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        // CORS問題を回避するため、crossOriginを削除
        img.onload = function() {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // 画像サイズを設定（正方形画像に最適化）
                const maxSize = 512;
                let canvasWidth, canvasHeight;
                
                if (img.width === img.height) {
                    // 正方形の場合
                    canvasWidth = Math.min(img.width, maxSize);
                    canvasHeight = canvasWidth;
                } else if (img.width > img.height) {
                    // 横長の場合
                    canvasWidth = Math.min(img.width, maxSize);
                    canvasHeight = (canvasWidth * img.height) / img.width;
                } else {
                    // 縦長の場合
                    canvasHeight = Math.min(img.height, maxSize);
                    canvasWidth = (canvasHeight * img.width) / img.height;
                }
                
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const dataURL = canvas.toDataURL('image/jpeg', 0.8);
                resolve(dataURL.split(',')[1]); // Base64部分のみを取得
            } catch (error) {
                console.log('画像変換エラー:', error);
                resolve(''); // エラーの場合は空文字
            }
        };
        img.onerror = (error) => {
            console.log('画像読み込みエラー:', error);
            resolve(''); // エラーの場合は空文字
        };
        img.src = imagePath;
    });
}

// 連絡先ダウンロード機能（モーダル用）
async function downloadContactFromModal() {
    try {
        // デバイスを判定
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);
        
        // プロフィール画像をBase64で取得（エラーが発生しても続行）
        let profileImageBase64 = '';
        try {
            profileImageBase64 = await getImageAsBase64('IMG_7691.jpeg');
        } catch (error) {
            console.log('画像取得エラー（続行）:', error);
        }
        
        // vCardを作成
        let vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Kamikariya Megumi
N:Kamikariya;Megumi;;;
ORG:クリイト株式会社
TITLE:鹿児島支店
EMAIL:kamikariya@qreat.co.jp
URL:https://www.instagram.com/megumi_fpdays?igsh=MWkxdXAyNTNnMmM1dA%3D%3D&utm_source=qr
NOTE:県内を中心に活動し、ママ目線で“無理しないお金の考え方”を提案。「相談してよかった」と言ってもらえる存在を目指しています。`;

        // プロフィール画像がある場合のみ追加
        if (profileImageBase64 && profileImageBase64.length > 0) {
            vCardData += `
PHOTO;TYPE=JPEG;ENCODING=BASE64:${profileImageBase64}`;
        }

        vCardData += `
END:VCARD`;

        // ファイルダウンロード
        const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Kamikariya_Megumi.vcf'; // 英語ファイル名で問題回避
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        // ポップアップメッセージを削除し、直接ダウンロード
        // デバイス別の処理は不要なポップアップなしで実行
        
    } catch (error) {
        console.error('連絡先保存エラー:', error);
        alert('連絡先の保存中にエラーが発生しました。再度お試しください。');
    }
    
    // モーダルを閉じる
    const saveModal = document.getElementById('save-options-modal');
    if (saveModal) {
        saveModal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// タブ切り替え機能
function showTab(tabId) {
    // 全てのタブボタンからactiveクラスを削除
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 全てのタブパネルを非表示
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // クリックされたタブボタンにactiveクラスを追加
    event.target.classList.add('active');
    
    // 対応するタブパネルを表示
    document.getElementById(tabId).classList.add('active');
}

// トースト通知表示
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff6b35;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1001;
        animation: slideUp 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 3秒後に自動削除
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 遅延読み込みの初期化
function initLazyLoading() {
    // 画像の遅延読み込み（将来的に画像を追加する場合）
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// パフォーマンス最適化: デバウンス関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// タッチデバイス対応の初期化
function initTouchSupport() {
    // タッチイベントの最適化
    const touchElements = document.querySelectorAll('.social-link, .btn-primary, .btn-secondary');
    
    touchElements.forEach(element => {
        // タッチ開始時のフィードバック
        element.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        // タッチ終了時のリセット
        element.addEventListener('touchend', function(e) {
            this.style.transform = 'scale(1)';
        }, { passive: true });
        
        // タッチキャンセル時のリセット
        element.addEventListener('touchcancel', function(e) {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
    
    // ダブルタップズームの無効化（必要に応じて）
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
}

// レスポンシブ対応の初期化
function initResponsiveSupport() {
    // 画面サイズ変更時の処理
    const handleResize = debounce(() => {
        // 画面サイズに応じた処理
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // モバイル判定
        const isMobile = width <= 768;
        const isTablet = width > 768 && width <= 1024;
        const isDesktop = width > 1024;
        
        // デバイスに応じた最適化
        if (isMobile) {
            // モバイル用の最適化
            document.body.classList.add('mobile-device');
            document.body.classList.remove('tablet-device', 'desktop-device');
        } else if (isTablet) {
            // タブレット用の最適化
            document.body.classList.add('tablet-device');
            document.body.classList.remove('mobile-device', 'desktop-device');
        } else if (isDesktop) {
            // デスクトップ用の最適化
            document.body.classList.add('desktop-device');
            document.body.classList.remove('mobile-device', 'tablet-device');
        }
        
        // 縦横比の調整
        if (height < width) {
            document.body.classList.add('landscape');
            document.body.classList.remove('portrait');
        } else {
            document.body.classList.add('portrait');
            document.body.classList.remove('landscape');
        }
    }, 100);
    
    // 初期実行
    handleResize();
    
    // リサイズイベント
    window.addEventListener('resize', handleResize);
    
    // オリエンテーション変更イベント
    window.addEventListener('orientationchange', () => {
        setTimeout(handleResize, 100);
    });
}

// スクロールイベントの最適化
const optimizedScrollHandler = debounce(() => {
    // スクロール時の処理（必要に応じて追加）
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // スクロール位置に応じた処理
    if (scrollY > windowHeight * 0.5) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);

// スワイプナビゲーションの初期化
function initSwipeNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    const tabContent = document.querySelector('.tab-content');
    
    if (!tabContent) return;
    
    let startX = 0;
    let startY = 0;
    let currentTabIndex = 0;
    
    // タブの順序を定義
    const tabOrder = ['about'];
    
    tabContent.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    tabContent.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // 水平スワイプが垂直スワイプより大きい場合のみ処理
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // 左スワイプ - 次のタブ
                currentTabIndex = Math.min(currentTabIndex + 1, tabOrder.length - 1);
            } else {
                // 右スワイプ - 前のタブ
                currentTabIndex = Math.max(currentTabIndex - 1, 0);
            }
            
            // タブを切り替え
            switchToTab(tabOrder[currentTabIndex]);
        }
        
        startX = 0;
        startY = 0;
    }, { passive: true });
}

// タブ切り替え関数
function switchToTab(tabId) {
    // 全てのタブボタンからactiveクラスを削除
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 全てのタブパネルを非表示
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // 対応するタブボタンにactiveクラスを追加
    const targetButton = document.querySelector(`[onclick="showTab('${tabId}')"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }
    
    // 対応するタブパネルを表示
    const targetPanel = document.getElementById(tabId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

// 振動フィードバックの初期化
function initVibrationFeedback() {
    // 振動がサポートされているかチェック
    if (!navigator.vibrate) return;
    
    // ボタンに振動フィードバックを追加
    const buttons = document.querySelectorAll('button, .social-link, .tag');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            // 短い振動（50ms）
            navigator.vibrate(50);
        }, { passive: true });
        
        button.addEventListener('click', function() {
            // クリック時の振動（100ms）
            navigator.vibrate(100);
        });
    });
}

// バックグラウンド更新の初期化
function initBackgroundUpdate() {
    // Service Workerがサポートされているかチェック
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('Service Worker registration failed:', err);
        });
    }
    
    // 定期的なデータ更新（5分ごと）
    setInterval(updateData, 5 * 60 * 1000);
    
    // ページがフォーカスされた時の更新
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            updateData();
        }
    });
}

// データ更新関数
function updateData() {
    // 現在時刻の更新
    const now = new Date();
    console.log('Data updated at:', now.toLocaleString());
    
    // 必要に応じて他のデータも更新
    // 例: ソーシャルメディアの最新情報、訪問者数など
}

// 編集モードの切り替え
function toggleEditMode() {
    const editButton = document.querySelector('.btn-edit');
    const isEditMode = editButton.textContent.includes('編集モード');
    
    if (isEditMode) {
        // 編集モードを有効にする
        enableEditMode();
        editButton.innerHTML = '<i class="fas fa-save"></i> 保存';
    } else {
        // 編集を保存する
        saveChanges();
        editButton.innerHTML = '<i class="fas fa-edit"></i> 編集モード';
    }
}

// 編集モードを有効にする
function enableEditMode() {
    // 編集可能な要素を特定
    const editableElements = [
        { selector: '.profile-name', type: 'text' },
        { selector: '.title', type: 'text' },
        { selector: '.subtitle', type: 'text' },
        { selector: '#about p', type: 'textarea' }
    ];
    
    editableElements.forEach(element => {
        const el = document.querySelector(element.selector);
        if (el) {
            el.contentEditable = true;
            el.style.border = '2px dashed #ff6b35';
            el.style.padding = '5px';
            el.style.borderRadius = '5px';
        }
    });
    
    // 編集モードの説明を表示
    showEditInstructions();
}

// 変更を保存する
function saveChanges() {
    const changes = {};
    
    // 変更された内容を収集
    const profileName = document.querySelector('.profile-name').textContent;
    const title = document.querySelector('.title').textContent;
    const subtitle = document.querySelector('.subtitle').textContent;
    
    changes.profileName = profileName;
    changes.title = title;
    changes.subtitle = subtitle;
    
    // ローカルストレージに保存
    localStorage.setItem('profileChanges', JSON.stringify(changes));
    
    // 編集モードを無効にする
    disableEditMode();
    
    // 保存完了の通知
    showSaveNotification();
}

// 編集モードを無効にする
function disableEditMode() {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(el => {
        el.contentEditable = false;
        el.style.border = 'none';
        el.style.padding = '0';
    });
}

// 編集説明を表示
function showEditInstructions() {
    const instructions = document.createElement('div');
    instructions.id = 'edit-instructions';
    instructions.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: rgba(255, 107, 53, 0.9); color: white; padding: 15px; border-radius: 10px; z-index: 1000; max-width: 300px;">
            <h4>編集モード</h4>
            <p>• オレンジの枠線の要素をクリックして編集</p>
            <p>• 変更後は「保存」ボタンをクリック</p>
            <p>• 編集をキャンセルする場合はページを再読み込み</p>
        </div>
    `;
    document.body.appendChild(instructions);
}

// 保存完了通知を表示
function showSaveNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: #967259; color: white; padding: 15px; border-radius: 10px; z-index: 1000;">
            <i class="fas fa-check"></i> 変更が保存されました！
        </div>
    `;
    document.body.appendChild(notification);
    
    // 3秒後に通知を削除
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 管理者認証（簡単なパスワード認証）
function authenticateAdmin() {
    const password = prompt('管理者パスワードを入力してください:');
    if (password === 'admin123') { // 実際の運用ではより安全な認証を使用
        document.querySelector('.btn-edit').style.display = 'block';
        return true;
    } else {
        alert('パスワードが正しくありません');
        return false;
    }
}

// 自己紹介のトグル機能
function toggleIntro() {
    const preview = document.querySelector('.intro-preview');
    const detail = document.querySelector('.intro-detail');
    
    if (detail.style.display === 'none') {
        // 詳細を表示
        preview.style.display = 'none';
        detail.style.display = 'block';
        detail.style.animation = 'fadeInUp 0.5s ease';
    } else {
        // 簡潔表示に戻す
        detail.style.display = 'none';
        preview.style.display = 'block';
        preview.style.animation = 'fadeInUp 0.5s ease';
    }
}

// 画像拡大モーダルを開く
function openImageModal(imageSrc, imageTitle) {
    // 既存のモーダルがあれば削除
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // モーダルオーバーレイ
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'image-modal';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        overflow: hidden;
    `;

    // モーダルコンテンツ
    const modalContent = document.createElement('div');
    modalContent.className = 'image-modal-content';
    modalContent.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    `;

    const titleHtml = imageTitle ? `
        <div class="image-modal-title" style="
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            font-size: 18px;
            font-weight: 600;
            text-align: center;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            z-index: 10;
        ">${imageTitle}</div>
    ` : '';

    modalContent.innerHTML = `
        <button class="image-modal-close" onclick="closeImageModal()" style="
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
            z-index: 10;
        ">
            <i class="fas fa-times"></i>
        </button>
        <div class="image-container" style="
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        ">
            <img id="modal-image" src="${imageSrc}" alt="${imageTitle}" style="
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                animation: zoomIn 0.3s ease;
                cursor: grab;
                user-select: none;
                transition: transform 0.1s ease;
            ">
        </div>
        ${titleHtml}
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // アニメーション用のCSS追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes zoomIn {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // モーダルを表示
    setTimeout(() => {
        modalOverlay.classList.add('active');
        modalOverlay.style.opacity = '1';
        modalOverlay.style.visibility = 'visible';
    }, 10);

    // ピンチズーム機能を初期化
    initPinchZoom(modalContent);

    // オーバーレイクリックで閉じる（画像以外の部分）
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay || e.target.classList.contains('image-container')) {
            closeImageModal();
        }
    });

    // ESCキーで閉じる
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
}

// 画像拡大モーダルを閉じる
function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ピンチズーム機能の初期化
function initPinchZoom(container) {
    const image = container.querySelector('#modal-image');
    if (!image) return;

    let scale = 1;
    let lastScale = 1;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    let lastTranslateX = 0;
    let lastTranslateY = 0;

    // タッチイベント
    let touches = [];
    let lastDistance = 0;

    // マウスホイールズーム
    image.addEventListener('wheel', function(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale = Math.max(0.5, Math.min(5, scale * delta));
        updateTransform();
    });

    // タッチ開始
    image.addEventListener('touchstart', function(e) {
        e.preventDefault();
        touches = Array.from(e.touches);
        
        if (touches.length === 1) {
            // 単一タッチ - ドラッグ開始
            isDragging = true;
            startX = touches[0].clientX - translateX;
            startY = touches[0].clientY - translateY;
        } else if (touches.length === 2) {
            // 二本指 - ピンチズーム
            isDragging = false;
            lastDistance = getDistance(touches[0], touches[1]);
            lastScale = scale;
        }
    }, { passive: false });

    // タッチ移動
    image.addEventListener('touchmove', function(e) {
        e.preventDefault();
        touches = Array.from(e.touches);

        if (touches.length === 1 && isDragging) {
            // 単一タッチ - ドラッグ
            translateX = touches[0].clientX - startX;
            translateY = touches[0].clientY - startY;
            updateTransform();
        } else if (touches.length === 2) {
            // 二本指 - ピンチズーム
            const currentDistance = getDistance(touches[0], touches[1]);
            const scaleChange = currentDistance / lastDistance;
            scale = Math.max(0.5, Math.min(5, lastScale * scaleChange));
            updateTransform();
        }
    }, { passive: false });

    // タッチ終了
    image.addEventListener('touchend', function(e) {
        e.preventDefault();
        touches = Array.from(e.touches);
        
        if (touches.length === 0) {
            isDragging = false;
            lastTranslateX = translateX;
            lastTranslateY = translateY;
        }
    }, { passive: false });

    // マウスドラッグ
    image.addEventListener('mousedown', function(e) {
        e.preventDefault();
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        image.style.cursor = 'grabbing';
    });

    image.addEventListener('mousemove', function(e) {
        if (isDragging) {
            e.preventDefault();
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();
        }
    });

    image.addEventListener('mouseup', function(e) {
        isDragging = false;
        image.style.cursor = 'grab';
        lastTranslateX = translateX;
        lastTranslateY = translateY;
    });

    image.addEventListener('mouseleave', function(e) {
        isDragging = false;
        image.style.cursor = 'grab';
        lastTranslateX = translateX;
        lastTranslateY = translateY;
    });

    // ダブルクリックでリセット
    image.addEventListener('dblclick', function(e) {
        e.preventDefault();
        scale = 1;
        translateX = 0;
        translateY = 0;
        lastTranslateX = 0;
        lastTranslateY = 0;
        updateTransform();
    });

    // 変形を適用
    function updateTransform() {
        image.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    // 二点間の距離を計算
    function getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// 情報保存モーダルの機能
document.addEventListener('DOMContentLoaded', function() {
    const saveModal = document.getElementById('save-options-modal');
    const openBtn = document.getElementById('open-save-modal-button');
    const closeBtn = document.getElementById('close-modal-button');
    const addToHomeBtn = document.getElementById('add-to-home-screen-button');

    if (openBtn) openBtn.addEventListener('click', () => {
        if (saveModal) { 
            saveModal.style.display = 'flex'; 
            document.body.style.overflow = 'hidden'; 
        }
    });
    
    if (closeBtn) closeBtn.addEventListener('click', () => {
        if (saveModal) { 
            saveModal.style.display = 'none'; 
            document.body.style.overflow = ''; 
        }
    });
    
    if (saveModal) saveModal.addEventListener('click', (e) => {
        if (e.target === saveModal) { 
            saveModal.style.display = 'none'; 
            document.body.style.overflow = ''; 
        }
    });

    if (addToHomeBtn) addToHomeBtn.addEventListener('click', () => {
        const instructions = `ホーム画面に追加する手順

【iPhone/iPadの場合】
1. Safariでサイトを開く
2. 共有アイコン（□↑）をタップ
3. 「ホーム画面に追加」をタップ
4. 「追加」をタップ

【Android(Chrome)の場合】
1. Chromeでサイトを開く
2. 右上の「⋮」メニューをタップ
3. 「ホーム画面に追加」をタップ
4. 案内に従って追加

追加後はKamikariya Megumiさんのプロフィール画像がアイコンとして表示され、「Kamikariya Megumi」という名前でホーム画面に追加されます。`;
        alert(instructions);
        if (saveModal) { 
            saveModal.style.display = 'none'; 
            document.body.style.overflow = ''; 
        }
    });
});

// ページ読み込み時に編集ボタンを表示するかチェック
document.addEventListener('DOMContentLoaded', function() {
    // URLパラメータで編集モードをチェック
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('edit') === 'true') {
        if (authenticateAdmin()) {
            // 認証成功時のみ編集ボタンを表示
        }
    }
});
