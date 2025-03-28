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
    "ataturk_hemsirelik": "https://obs.atauni.edu.tr/moduller/dbp/eobs/birimDetay/3304/Hem%C5%9Firelik%20Program%C4%B1%20(3304)?",
    "ataturk_bilgisayar_muhendisligi": "https://obs.atauni.edu.tr/moduller/dbp/eobs/birimDetay/1765/Bilgisayar%20M%C3%BChendisli%C4%9Fi%20Program%C4%B1%20(1765)?",
    "ataturk_isletme": "https://obs.atauni.edu.tr/moduller/dbp/eobs/birimDetay/1107/%C4%B0%C5%9Fletme%20Program%C4%B1%20(1107)?",
    "ataturk_yazilim_muhendisligi": "https://obs.atauni.edu.tr/moduller/dbp/eobs/birimDetay/3954/Yaz%C4%B1l%C4%B1m%20M%C3%BChendisli%C4%9Fi%20Program%C4%B1%20(3954)?",
    "ataturk_veterinerlik": "https://obs.atauni.edu.tr/moduller/dbp/eobs/birimDetay/1200/Veteriner%20Program%C4%B1%20(1200)?"
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
