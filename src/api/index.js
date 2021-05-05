import Network from './network'

// 封装各个接口请求
export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')
export const getNewAlbum = () => Network.get('album/newest')
export const getNewSong = () => Network.get('personalized/newsong')
export const getPlayList = (data) => Network.get('playlist/detail', data)
export const getAlbum = (data) => Network.get('album', data)
export const getSongDetail = (data) => Network.get('song/detail', data)
export const getSongLyric = (data) => Network.get('lyric', data)
export const getSongUrl = (data) => Network.get('song/url', data)
export const getArtistsSongs = (data) => Network.get('artists', data)

export const getTopList = (data) => Network.get('top/list', data)
// 登录
export const accoutLogin = (data) => Network.post('login/cellphone', data)
export const likelist = (data) => Network.get('likelist', data)
// 获取热门歌手数据
export const getHotArtists = () => {
  return new Promise((resolve, reject) => {
    Network.get('top/artists?offset=0&limit=10')
      .then((result) => {
        resolve(result.artists)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const getLetterArtists = (letter) => {
  return new Promise((resolve, reject) => {
    const letterArtists = []
    Network.get(`artist/list?type=-1&area=-1&initial=${letter}`)
      .then((result) => {
        result.artists.forEach(item => {
          letterArtists.push(item)
        })
        resolve(letterArtists)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const getAllArtists = (letter) => {
  return new Promise((resolve, reject) => {
    const keys = ['热']
    const list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
      .then((result) => {
        const obj = {}
        obj.keys = keys
        obj.list = result[0]
        resolve(obj)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
export const getRankId = () => {
  return new Promise((resolve, reject) => {
    Network.get('toplist').then((result) => {
      const rankIdList = []
      result.list.forEach((ele) => {
        rankIdList.push(ele.id)
      })
      resolve(rankIdList)
    })
      .catch((err) => {
        reject(err)
      })
  })
}
export const getSearchHot = () => Network.get('search/hot')
export const getSearchList = (data) => Network.get('search?type=1', data)
