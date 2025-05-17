import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
  },
  form: {
    backgroundColor: '#ffffff',
    width: '90%',
    maxWidth: 360,
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  title: {
    color: '#096B68',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#F1F5F9',
    color: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#129990',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomText: {
    color: '#333',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
  bottomLink: {
    color: '#096B68',
    fontWeight: 'bold',
  },
});

export default styles;
