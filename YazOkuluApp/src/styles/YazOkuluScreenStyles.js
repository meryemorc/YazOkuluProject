import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#096B68',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#096B68',
    marginBottom: 6,
    fontSize: 16,
    fontWeight: '600',
  },
  selectBox: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 10,
    borderColor: '#90D1CA',
    borderWidth: 1,
    marginBottom: 12,
  },
  selectText: {
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#096B68',
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#096B68',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  courseList: {
    marginTop: 12,
  },
  courseCard: {
    backgroundColor: '#E0F2F1',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  courseTitle: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  courseInfo: {
    color: '#333',
    marginTop: 4,
  },
  backButton: {
    backgroundColor: '#096B68',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
