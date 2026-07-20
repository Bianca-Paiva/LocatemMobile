import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginBottom: 16,
    marginHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  profileGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  starsRow: {
    flexDirection: 'row',
  },
  dateText: {
    fontSize: 12,
    color: '#999999',
  },
  feedbackText: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 20,
    marginBottom: 16,
  },
  photosContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  attachedPhoto: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  usefulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  usefulButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  usefulIcon: {
    marginRight: 6,
  },
});