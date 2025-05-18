import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#096B68',
    textAlign: 'center',
    marginBottom: 24,
  },
  uploadButton: {
    backgroundColor: '#096B68',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  uploadButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileCard: {
    marginTop: 12,
    backgroundColor: '#E6F4F1',
    borderColor: '#096B68',
    borderWidth: 1.3,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  fileName: {
    fontSize: 14,
    color: '#096B68',
    fontWeight: '500',
  },
  matchButton: {
    backgroundColor: '#096B68',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  matchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Uyumlu/Uyumsuz Ders Kartı Toggle Butonları
  matchedToggle: {
    marginTop: 24,
    backgroundColor: '#57A6A1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  unmatchedToggle: {
    marginTop: 24,
    backgroundColor: '#B8001F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Scrollable Kartlar
  scrollCard: {
    maxHeight: 300,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 10,
    padding: 10,
  },
  matchedCard: {
    backgroundColor: '#41B06E',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  unmatchedCard: {
    backgroundColor: '#B8001F',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  resultText: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 15,
  },
  selectedFileCard: {
  marginTop: 10,
  backgroundColor: '#f1f5f9',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderWidth: 1.5,
  borderColor: '#096B68',
  alignItems: 'center',
},

selectedFileText: {
  color: '#096B68',
  fontWeight: 'bold',
  fontSize: 15,
},
yellowCard: {
  marginTop: 20,
  padding: 12,
  borderRadius: 10,
  backgroundColor: '#213555',
  borderWidth: 1,
  borderColor: '#6A669D',
},
yellowCardTitle: {
  color: '#ffffff',
  fontWeight: 'bold',
  marginBottom: 6,
},
yellowCardText: {
  color: '#ffffff',
  fontSize: 14,
},
chatFinalButton: {
  backgroundColor: '#176B87',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginVertical: 12,
},
chatFinalButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
floatingChatButton: {
  position: 'absolute',
  bottom: 28,
  right: 24,
  backgroundColor: '#9DB2BF', // turkuaz ton
  width: 60,
  height: 60,
  borderRadius: 28,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 5,
  zIndex: 999,
},
floatingChatIcon: {
  fontSize: 24,
  color: '#fff',
  fontWeight: 'bold',
},
floatingHomeButton: {
  position: 'absolute',
  bottom: 20,
  left: 20,
  backgroundColor: '#5DB996',
  width: 50,
  height: 50,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 999,
  elevation: 6,
},
floatingHomeIcon: {
  color: '#fff',
  fontSize: 22,
}



});


export default styles;
