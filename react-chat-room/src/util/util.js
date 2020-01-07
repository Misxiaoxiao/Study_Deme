export function getRedirectToUrl(data) {
  let url = data.type === 'boss' ? '/boss' : '/seeker';
  if (!data.avatar) {
    url += 'info';
  }
  return url;
}

export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_');
}
