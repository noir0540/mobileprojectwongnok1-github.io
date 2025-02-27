document.addEventListener("DOMContentLoaded", function () {
    const images = [
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        "https://images.unsplash.com/photo-1521747116042-5a810fda9664"
    ];
    
    let currentIndex = 0;
    const imageElement = document.getElementById("carousel-image");
    const indicators = document.querySelectorAll(".indicator");
    let autoSlide;

    // อัปเดตทั้งรูปภาพและตัวชี้ตำแหน่ง
    function updateCarousel() {
        // อัปเดตรูปภาพ
        imageElement.src = images[currentIndex];
        
        // อัปเดตตัวชี้ตำแหน่ง
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add("opacity-100");
                indicator.classList.remove("opacity-60");
            } else {
                indicator.classList.add("opacity-60");
                indicator.classList.remove("opacity-100");
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            nextSlide();
            console.log("Auto Slide - Current index:", currentIndex);
        }, 3000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    // ตัวแปรสำหรับการจัดการการปัดนิ้ว
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carouselContainer = document.getElementById("carousel-container");

    // เริ่มการปัด - บันทึกตำแหน่งเริ่มต้น
    carouselContainer.addEventListener("touchstart", (event) => {
        touchStartX = event.changedTouches[0].screenX;
        clearInterval(autoSlide);
    });

    // สิ้นสุดการปัด - คำนวณทิศทางและเปลี่ยนสไลด์
    carouselContainer.addEventListener("touchend", (event) => {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
        resetAutoSlide();
    });
    
    // จัดการกับการปัดนิ้ว
    function handleSwipe() {
        const swipeThreshold = 50; // ความไกลขั้นต่ำที่ถือว่าเป็นการปัด
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > swipeThreshold) {
            // ปัดไปทางขวา - ไปยังรูปก่อนหน้า
            console.log("Swiped right - Previous image");
            prevSlide();
        } else if (swipeDistance < -swipeThreshold) {
            // ปัดไปทางซ้าย - ไปยังรูปถัดไป
            console.log("Swiped left - Next image");
            nextSlide();
        }
    }

    // สร้างตัวควบคุมด้วยคีย์บอร์ด (สำหรับการทดสอบบนเดสก์ท็อป)
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            prevSlide();
            resetAutoSlide();
        } else if (event.key === "ArrowRight") {
            nextSlide();
            resetAutoSlide();
        }
    });

    // ทำให้ตัวชี้ตำแหน่งสามารถคลิกได้
    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            currentIndex = index;
            updateCarousel();
            resetAutoSlide();
        });
    });

    // กำหนดค่าเริ่มต้น
    updateCarousel(); // แสดงรูปภาพแรกและไฮไลท์ตัวชี้ตำแหน่งแรก
    startAutoSlide();
});