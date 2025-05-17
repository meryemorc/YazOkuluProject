import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#096B68',
    textAlign: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    fontWeight: '600',
  },
  selectBox: {
    backgroundColor: '#e5e7eb',        // gri arka plan
    borderColor: '#096B68',            // yeşil kenarlık
    borderWidth: 1.5,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  selectText: {
    color: '#096B68',                  // iç metin yeşilimsi
    fontSize: 16,
    fontWeight: '500',
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
  selectedFileText: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
  matchButton: {
  backgroundColor: '#90D1CA',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 20,
},
matchButtonText: {
  color: '#000',
  fontWeight: 'bold',
  fontSize: 16,
},

resultHeader: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
  marginBottom: 10,
},
resultEmpty: {
  fontStyle: 'italic',
  color: '#666',
},
resultCardGreen: {
  backgroundColor: '#d1fae5',
  borderColor: '#10b981',
  borderWidth: 1,
  padding: 10,
  borderRadius: 6,
  marginBottom: 8,
},
resultCardRed: {
  backgroundColor: '#fee2e2',
  borderColor: '#ef4444',
  borderWidth: 1,
  padding: 10,
  borderRadius: 6,
  marginBottom: 8,
},
resultText: {
  fontSize: 15,
  fontWeight: '500',
  color: '#111827',
},

});

export default styles;
