import {HTTP} from '../utils/http.js'
class LikeModel extends HTTP {
  like(behavior, artID, type) {
    let url = behavior == "like" ? 'like' :'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: type
      }
    })
  }

  getClassicLikeStatus(artID, category, sCallaback) {
    this.request({
      url: `classic/${category}/${artID}/favor`,
      success: sCallaback
    })
  }
}
export { LikeModel }