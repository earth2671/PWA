// ========================================
// CheangYeun Hosassist
// PWA Launcher
// ========================================


// ========================================
// Google Apps Script Web App
// ========================================

const APP_URL =
  "https://script.google.com/macros/s/AKfycbyHLdkXvYpmzoLpb4zXzOkal6hB88JKquze9t61pdWhcKcfUkepM4tkgn3-THcENiPskg/exec";


// ========================================
// เปิด Apps Script
// ========================================

function openApp() {

  window.location.replace(APP_URL);

}


// ========================================
// Service Worker
// ========================================

if ("serviceWorker" in navigator) {

  window.addEventListener(
    "load",
    function () {

      navigator.serviceWorker
        .register("./sw.js")
        .then(function (registration) {

          console.log(
            "PWA Service Worker registered:",
            registration.scope
          );

        })
        .catch(function (error) {

          console.error(
            "Service Worker registration failed:",
            error
          );

        });

    }
  );

}


// ========================================
// เปิดระบบหลังจากโหลดหน้า
// ========================================

window.addEventListener(
  "load",
  function () {

    setTimeout(
      openApp,
      700
    );

  }
);
