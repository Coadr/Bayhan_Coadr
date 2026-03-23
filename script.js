
  // 1. القوائم البرمجية (تخصصات وجامعات)
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

// دالة الإغلاق (يجب أن تكون خارج DOMContentLoaded لتعمل من الـ HTML)
function closeModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.style.display = 'none';
        // اختياري: العودة لأعلى الصفحة بعد الإغلاق
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadersForm');
    const mainSelect = document.getElementById("main-specialty");
    const subSelect = document.getElementById("sub-specialty");
    const countrySelect = document.getElementById("country");
    const qualificationSelect = document.getElementById('qualification');
    const uniTypeSelect = document.getElementById("university-type");
    const uniSelect = document.getElementById("university-select");
    const uniListWrapper = document.getElementById("uni-list-wrapper");
    const otherUniWrapper = document.getElementById("other-uni-wrapper");
    const otherUniInput = document.getElementById("other_university");
    const mainOther = document.getElementById("main-other");
    const subOther = document.getElementById("sub-other");
    const otherCountryWrapper = document.getElementById("other-country-wrapper");
    const otherCountryInput = document.getElementById("other_country");
    const otherEduWrapper = document.getElementById('other-edu-wrapper');
    const phoneInput = document.getElementById('phone');
    const phoneKeySelect = document.getElementById('phone-key');
    const phoneHint = document.getElementById('phone-hint');


function moveToNext(currentElement) {
    // 1. تعريف مصفوفة المدخلات داخل الدالة لضمان تشميل العناصر التي ظهرت حديثاً
    const allInputs = Array.from(document.getElementById('cadersForm').querySelectorAll('input:not([type="hidden"]), select, textarea'));
    
    // 2. معالجة خاصة لخيارات "أخرى" (Other) لضمان القفز إليها مباشرة
    const otherMappings = {
        'main-specialty': { value: 'other-main', target: 'main-other' },
        'sub-specialty': { value: 'أخرى', target: 'sub-other' },
        'university-select': { value: 'other_custom', target: 'other_university' },
        'country': { value: 'other', target: 'other_country' }
    };

    const mapping = otherMappings[currentElement.id];
    if (mapping && currentElement.value === mapping.value) {
        const targetEl = document.getElementById(mapping.target);
        if (targetEl) {
            setTimeout(() => targetEl.focus(), 100);
            return;
        }
    }

    // 3. المنطق العام للانتقال للحقل التالي المرئي
    const currentIndex = allInputs.indexOf(currentElement);
    if (currentIndex === -1) return; // إذا لم يجد العنصر في المصفوفة

    for (let i = currentIndex + 1; i < allInputs.length; i++) {
        const nextField = allInputs[i];
        
        // التحقق من أن الحقل مرئي (Display ليس none) وليس معطلاً
        const isVisible = nextField.offsetWidth > 0 && nextField.offsetHeight > 0;
        
        if (isVisible && !nextField.disabled) {
            setTimeout(() => {
                nextField.focus();
                // إذا كان الحقل "Select"، يفضل أحياناً عدم فتحه تلقائياً لراحة المستخدم
            }, 150);
            break;
        }
    }
}

// تحديث مستمعي الأحداث (Event Listeners) لتعمل مع الدالة الجديدة
document.querySelectorAll('#cadersForm input, #cadersForm select, #cadersForm textarea').forEach(input => {
    // عند التغيير (للقوائم المنسدلة)
    input.addEventListener('change', function() {
        if (this.value !== "") {
            moveToNext(this);
        }
    });

    // عند الضغط على Enter (للحقول النصية)
    if (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA') {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                moveToNext(this);
            }
        });
    }
});

    // --- منطق الجوال ---
    function updatePhoneValidation() {
        const selectedOption = phoneKeySelect.options[phoneKeySelect.selectedIndex];
        const expectedLen = selectedOption.getAttribute('data-len');
        if (expectedLen) {
            phoneInput.maxLength = expectedLen;
            phoneHint.innerText = `المطلوب: ${expectedLen} أرقام لهذا المفتاح.`;
        }
    }
    phoneKeySelect.addEventListener('change', updatePhoneValidation);
    updatePhoneValidation();

    // --- منطق القوائم (تخصصات/جامعات) ---
    if (mainSelect) {
        mainSelect.addEventListener("change", function() {
            subSelect.innerHTML = '<option value="">اختر نوع التخصص</option>';
            mainOther.style.display = (this.value === "other-main") ? "block" : "none";
            if (specialties[this.value]) {
                specialties[this.value].forEach(item => {
                    const option = new Option(item, item);
                    subSelect.add(option);
                });
            }
        });
    }

    subSelect.addEventListener("change", function() {
        subOther.style.display = (this.value === "أخرى") ? "block" : "none";
    });

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
        } else {
            uniListWrapper.style.display = "none";
            otherUniWrapper.style.display = "none";
        }
    });

    uniSelect.addEventListener('change', function() {
        otherUniWrapper.style.display = (this.value === "other_custom") ? "block" : "none";
    });

    countrySelect.addEventListener('change', function() {
        otherCountryWrapper.style.display = (this.value === 'other') ? 'block' : 'none';
    });

    // --- الإرسال ---
    form.addEventListener('submit', e => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerText = "جاري الإرسال...";

        const formData = new FormData(form);
        // تخصيص البيانات قبل الإرسال
        formData.set('phone', phoneKeySelect.value + phoneInput.value);
        if (countrySelect.value === "other") formData.set('country', otherCountryInput.value);
        if (mainSelect.value === "other-main") formData.set('mainSpecialty', mainOther.value);
        if (subSelect.value === "أخرى") formData.set('subSpecialty', subOther.value);
  // استبدل هذا السطر في ملف script.js
fetch('https://script.google.com/macros/s/AKfycbyp3GtlI_j8P6nBvmcbH_bFVeAaX6Y7R9GAhDOO-UTpBwamNC-AuQ1wTLLFY44ff1h4/exec', { 
    method: 'POST',  
    mode: 'no-cors', // اتركها كما هي لتجنب مشاكل الـ CORS
    body: formData
})

        
        .then(() => {
            document.getElementById('thankYouModal').style.display = 'flex';
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerText = "إرسال وتوثيق البيانات";
            // إخفاء حقول "أخرى"
            [mainOther, subOther, otherCountryWrapper, uniListWrapper, otherUniWrapper].forEach(el => { if(el) el.style.display = "none"; });
        })
        .catch(err => {
            alert("حدث خطأ، حاول مجدداً");
            submitBtn.disabled = false;
        });
    });
});

function showProfileSection() {
    const profileSection = document.getElementById('profile');
    
    // إظهار القسم
    profileSection.style.display = 'block';
    
    // إضافة تأخير بسيط لتفعيل تأثير الحركة (Transition)
    setTimeout(() => {
        profileSection.classList.add('show');
        // التوجه إلى القسم بسلاسة
        profileSection.scrollIntoView({ behavior: 'smooth' });
    }, 10);
}
const text = "نسعى لعمل قاعدة بيانات لجمع جميع بيانات الكوادر في الداخل والخارج، وضم جميع الكوادر في قروبات منصة كوادر على مواقع التواصل الاجتماعي لتبادل الخبرات.";
const typingElement = document.getElementById("typing-text");

let index = 0;
let isDeleting = false;
let speed = 100; // سرعة الكتابة الأساسية

function typeLoop() {
    // تحديد النص الحالي بناءً على الحروف المقطوعة
    const currentText = text.substring(0, index);
    typingElement.innerHTML = currentText;

    // التحكم في السرعة (أسرع عند المسح)
    speed = isDeleting ? 30 : 200;

    if (!isDeleting && index < text.length) {
        index++; // إضافة حرف
    } else if (isDeleting && index > 0) {
        index--; // مسح حرف
    } else if (!isDeleting && index === text.length) {
        isDeleting = true; // البدء بالمسح بعد اكتمال النص
        speed = 2000; // توقف لمدة ثانيتين عند اكتمال الجملة
    } else if (isDeleting && index === 0) {
        isDeleting = false; // العودة للكتابة من جديد
        speed = 500; // توقف بسيط قبل البدء مرة أخرى
    }

    setTimeout(typeLoop, speed);
}

// بدء التأثير
window.onload = () => setTimeout(typeLoop, 1000);
// تحسين دالة إظهار حقول "أخرى" مع التركيز التلقائي
function toggleOtherField(selectElement, otherWrapperId, otherInputId) {
    const wrapper = document.getElementById(otherWrapperId);
    const input = document.getElementById(otherInputId);
    
    if (selectElement.value === "أخرى" || selectElement.value === "other" || selectElement.value === "other_custom" || selectElement.value === "other-main") {
        wrapper.style.display = "block";
        input.focus(); // تركيز تلقائي
        input.required = true;
    } else {
        wrapper.style.display = "none";
        input.required = false;
    }
}

// إضافة ميزة منع مغادرة الصفحة أثناء التعبئة
window.onbeforeunload = function() {
    const fullName = document.querySelector('input[name="fullName"]').value;
    if (fullName.length > 0) {
        return "هل أنت متأكد من المغادرة؟ سيتم فقدان البيانات التي أدخلتها.";
    }
};
// التحقق الفوري للاسم الرباعي
const nameInput = document.getElementsByName('fullName')[0];
nameInput.addEventListener('input', function() {
    if (validateQuadName(this.value)) {
        this.style.borderColor = '#4ade80';
        this.parentElement.setAttribute('data-valid', 'true');
    } else {
        this.style.borderColor = 'rgba(255,255,255,0.1)';
    }
});
function animateCounter(id, target) {
    let count = 0;
    let interval = setInterval(() => {
        if (count >= target) clearInterval(interval);
        document.getElementById(id).innerText = count + "+";
        count += Math.ceil(target / 50);
    }, 30);
}
// تشغيل عند الوصول للقسم
window.onscroll = () => {
    const statsSection = document.querySelector('.stats-card');
    if (window.scrollY > statsSection.offsetTop - 500) {
        animateCounter('cadre-count', 150);
    }
};
window.addEventListener('scroll', () => {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        header.style.top = '0';
        header.style.width = '100%';
    } else {
        header.classList.remove('scrolled');
        header.style.top = '20px';
        header.style.width = '90%';
    }
});
  
