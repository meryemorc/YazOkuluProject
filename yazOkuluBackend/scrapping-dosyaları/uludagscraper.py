from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import csv

driver_path = "C:/WebDriver/chromedriver-win64/chromedriver.exe"

service = Service(driver_path)
options = webdriver.ChromeOptions()
options.add_argument("--headless")
driver = webdriver.Chrome(service=service, options=options)

# Bölümler ve URL'leri
departments = {
    "uludag_hemsirelik": "https://bilgipaketi.uludag.edu.tr/Programlar/Detay/1667?AyID=32",
    "uludag_bilgisayar_muhendisligi": "https://bilgipaketi.uludag.edu.tr/Programlar/Detay/1520?AyID=32",
    "uludag_isletme": "https://bilgipaketi.uludag.edu.tr/Programlar/Detay/340?AyID=32",
    "uludag_elektrik_elektronik_muhendisligi": "https://bilgipaketi.uludag.edu.tr/Programlar/Detay/1331?AyID=32",
    "uludag_veterinerlik": "https://bilgipaketi.uludag.edu.tr/Programlar/Detay/76?AyID=32"
}

# Her bölüm için scraping işlemi
for department, url in departments.items():
    driver.get(url)

    try:
        iframe = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "iframe"))
        )
        driver.switch_to.frame(iframe)
        print(f"{department} için iframe içine geçildi.")
    except:
        print(f"{department} iframe bulunamadı, doğrudan devam ediliyor.")

    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "grdBolognaDersler"))
        )
        print(f"{department} için tablo bulundu.")
    except:
        print(f"{department} için tablo bulunamadı.")

    rows = driver.find_elements(By.XPATH, '//table[@id="grdBolognaDersler"]//tr')

    # CSV dosyasına yazma
    with open(f"{department}_scraped_real.csv", "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        for row in rows:
            cols = row.find_elements(By.TAG_NAME, "td")
            writer.writerow([col.text.strip() for col in cols])

    print(f"{department} scraping tamamlandı!")

# Tarayıcıyı kapat
driver.quit()
