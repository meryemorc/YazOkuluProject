package com.oruc.yazokulumobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.oruc.yazokulumobile.ui.LoginScreen
import com.oruc.yazokulumobile.ui.theme.YazOkuluMobileTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            YazOkuluMobileTheme {
                LoginScreen(
                    onLoginClick = { email, password ->
                        println("📨 Giriş yapılıyor: $email / $password")
                    },
                    onNavigateToRegister = {
                        println("➡️ Kayıt ekranına geçiş yapılacak")
                    }
                )
            }
        }
    }
}
