import defaultSettings from '@/settings'

const title = defaultSettings.front.title || '标题 Vue Element'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
