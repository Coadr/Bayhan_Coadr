// --- 1. البيانات البرمجية ---
const specialties = {
    engineering: ["هندسة مدنية", "هندسة معمارية", "هندسة كهربائية", "هندسة ميكانيكية", "هندسة برمجيات", "هندسة اتصالات", "أخرى"],
    medicine: ["طب عام", "صيدلة", "تمريض", "مختبرات", "أسنان", "أخرى"],
    law: ["قانون خاص", "قانون عام", "شريعة وقانون", "أخرى"],
    education: ["رياض أطفال", "تربية خاصة", "معلم صف", "تقنيات تعليم", "أخرى"],
    it: ["علوم حاسوب", "شبكات", "أمن سيبراني", "ذكاء اصطناعي", "برمجة", "أخرى"],
    business: ["إدارة أعمال", "محاسبة", "تمويل", "تسويق", "أعمال دولية", "أخرى"],
    media: ["إعلام", "صحافة", "علاقات عامة", "أخرى"],
    design: ["تصميم جرافيك", "تصميم داخلي", "فن تشكيلي", "أخرى"],
    aviation: ["ملاحة جوية", "هندسة طيران", "خدمات جوية", "أخرى"],
    military: ["علوم عسكرية", "أمن ودفاع", "أخرى"],
    science: ["فيزياء", "كيمياء", "أحياء", "رياضيات", "أخرى"],
    agriculture: ["زراعة عامة", "إنتاج نباتي", "إنتاج حيواني", "أخرى"],
    logistics: ["نقل دولي", "سلاسل إمداد", "إدارة مخازن", "أخرى"],
    tourism: ["فندقة", "إرشاد سياحي", "سياحة", "أخرى"],
    sports: ["تربية بدنية", "علوم رياضية", "أخرى"],
    finance: ["مالية", "محاسبة", "بنوك", "أخرى"],
    marketing: ["تسويق رقمي", "تجارة إلكترونية", "أخرى"],
    hr: ["موارد بشرية", "تطوير تنظيمي", "أخرى"],
    environment: ["بيئة", "طاقة متجددة", "أخرى"],
    psychology: ["علم نفس عام", "إرشاد نفسي", "أخرى"],
    languages: ["ترجمة", "لغة إنجليزية", "لغة عربية", "أخرى"],
    history: ["تاريخ", "آثار", "أخرى"],
    "other-main": ["أخرى"]
};

const universityData = {
    government: ["جامعة صنعاء", "جامعة عدن", "جامعة تعز", "جامعة الحديدة", "جامعة إب", "جامعة البيضاء", "جامعة ذمار", "جامعة حجة", "جامعة شبوة", "جامعة المهرة", "جامعة حضرموت", "جامعة سيئون", "جامعة العلوم والتكنولوجيا (حكومية)"],
    private: ["الجامعة العربية للعلوم والتقنية", "جامعة العلوم والتكنولوجيا", "جامعة العلوم والتكنولوجيا – عدن", "جامعة العطاء", "جامعة الجند", "جامعة عمران الأهلية", "جامعة الهجرة", "جامعة اليمن", "جامعة العاصمة", "جامعة سبأ", "جامعة الرشيد", "جامعة الإمارات الدولية", "جامعة الجزيرة", "جامعة الشعوب", "الجامعة العالمية", "جامعة القرآن والعلوم الإسلامية", "جامعة الرؤية", "جامعة الإبداع", "جامعة المستقبل"]
};

// --- 2. الدوال العامة ---
function closeModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showProfileSection() {
    const profileSection = document.getElementById('profile');
    if (profileSection) {
        profileSection.style.display = 'block';
        setTimeout(() => {
            profileSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }
}

function toggleMenu() {
    const menuBtn = document.getElementById('mobile-menu');
    const mobileNav = document.getElementById('mobile-nav');
    if (menuBtn && mobileNav) {
        menuBtn.classList.toggle('is-active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    }
}

// --- 3. دالة التنقل الذكي (الميزة المطلوبة) ---
function moveToNext(currentElement) {
    const form = document.getElementById('cadersForm');
    if (!form) return;

    const allInputs = Array.from(form.querySelectorAll('input:not([type="hidden"]), select, textarea'));
    
    // معالجة القفز لحقول "أخرى"
    const otherMappings = {
        'main-specialty': { value: 'other-main', target: 'main-other' },
        'sub-specialty': { value: 'أخرى', target: 'sub-other' },
        'university-select': { value: 'other_custom', target: 'other_university' },
        'country': { value: 'other', target: 'other-country-wrapper' } // ملاحظة: تأكد من ID الحقل النصي الفعلي
    };

    const mapping = otherMappings[currentElement.id];
    if (mapping && currentElement.value === mapping.value) {
        const targetEl = document.getElementById(mapping.target);
        if (targetEl) {
            setTimeout(() => targetEl.focus(), 100);
            return;
        }
    }

    // الانتقال للعنصر التالي المرئي
    const currentIndex = allInputs.indexOf(currentElement);
    for (let i = currentIndex + 1; i < allInputs.length; i++) {
        const nextField = allInputs[i];
        const isVisible = nextField.offsetWidth > 0 && nextField.offsetHeight > 0;
        
        if (isVisible && !nextField.disabled) {
            setTimeout(() => nextField.focus(), 150);
            break;
        }
    }
}

// --- 4. عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadersForm');
    const mainSelect = document.getElementById("main-specialty");
    const subSelect = document.getElementById("sub-specialty");
    const countrySelect = document.getElementById("country");
    const uniTypeSelect = document.getElementById("university-type");
    const uniSelect = document.getElementById("university-select");
    const uniListWrapper = document.getElementById("uni-list-wrapper");
    const otherUniWrapper = document.getElementById("other-uni-wrapper");
    const mainOther = document.getElementById("main-other");
    const subOther = document.getElementById("sub-other");
    const otherCountryWrapper = document.getElementById("other-country-wrapper");
    const phoneInput = document.getElementById('phone');
    const phoneKeySelect = document.getElementById('phone-key');

    // تفعيل ميزة التنقل على الحقول
    document.querySelectorAll('#cadersForm input, #cadersForm select, #cadersForm textarea').forEach(input => {
        input.addEventListener('change', function() {
            if (this.value !== "") moveToNext(this);
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                moveToNext(this);
            }
        });
    });

    // منطق التخصصات
    if (mainSelect) {
        mainSelect.addEventListener("change", function() {
            subSelect.innerHTML = '<option value="">اختر نوع التخصص</option>';
            mainOther.style.display = (this.value === "other-main") ? "block" : "none";
            if (specialties[this.value]) {
                specialties[this.value].forEach(item => {
                    subSelect.add(new Option(item, item));
                });
            }
        });
    }

    if (subSelect) {
        subSelect.addEventListener("change", function() {
            subOther.style.display = (this.value === "أخرى") ? "block" : "none";
        });
    }

    // منطق الجامعات
    if (uniTypeSelect) {
        uniTypeSelect.addEventListener('change', function() {
            uniSelect.innerHTML = '<option value="">اختر الجامعة</option>';
            if (this.value === "government" || this.value === "private") {
                uniListWrapper.style.display = "block";
                otherUniWrapper.style.display = "none";
                universityData[this.value].forEach(uni => uniSelect.add(new Option(uni, uni)));
                uniSelect.add(new Option("أخرى (غير مدرج)", "other_custom"));
            } else if (this.value === "other_uni") {
                uniListWrapper.style.display = "none";
                otherUniWrapper.style.display = "block";
            }
        });
    }

    if (uniSelect) {
        uniSelect.addEventListener('change', function() {
            otherUniWrapper.style.display = (this.value === "other_custom") ? "block" : "none";
        });
    }

    if (countrySelect) {
        countrySelect.addEventListener('change', function() {
            otherCountryWrapper.style.display = (this.value === 'other') ? 'block' : 'none';
        });
    }

    // إرسال النموذج (Fetch)
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerText = "جاري الإرسال...";

            const formData = new FormData(form);
            formData.set('phone', phoneKeySelect.value + phoneInput.value);

            // رابط الـ Script (تم تحديثه للرابط الأخير في الكود الثاني)
            fetch('https://script.google.com/macros/s/AKfycbyp3GtlI_j8P6nBvmcbH_bFVeAaX6Y7R9GAhDOO-UTpBwamNC-AuQ1wTLLFY44ff1h4/exec', { 
                method: 'POST',  
                mode: 'no-cors',
                body: formData
            })
            .then(() => {
                document.getElementById('thankYouModal').style.display = 'flex';
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = "إرسال وتوثيق البيانات";
                [mainOther, subOther, otherCountryWrapper, uniListWrapper, otherUniWrapper].forEach(el => { if(el) el.style.display = "none"; });
            })
            .catch(err => {
                alert("حدث خطأ، حاول مجدداً");
                submitBtn.disabled = false;
                submitBtn.innerText = "إرسال وتوثيق البيانات";
            });
        });
    }

    const text = "منصة كوادر بيحان الرؤية المستقبلية لبناء بيحان... ";
    const typingElement = document.getElementById("typing-text");
    let index = 0;
    let isDeleting = false;

    function typeLoop() {
        if(!typingElement) return;
        const currentText = text.substring(0, index);
        typingElement.innerHTML = currentText;
        let speed = isDeleting ? 30 : 150;
        if (!isDeleting && index < text.length) index++;
        else if (isDeleting && index > 0) index--;
        else if (!isDeleting && index === text.length) { isDeleting = true; speed = 2000; }
        else if (isDeleting && index === 0) { isDeleting = false; speed = 500; }
        setTimeout(typeLoop, speed);
    }
    typeLoop();
});
window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});
