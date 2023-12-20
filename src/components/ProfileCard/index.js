import {BsGrid3X3} from 'react-icons/bs'

import './index.css'
import UserPosts from '../UserPosts'
import SearchContext from '../../SearchContext'

const ProfileCard = props => {
  const {profile, my} = props

  return (
    <SearchContext.Consumer>
      {value => {
        const {isDark} = value

        const profileName = isDark ? 'names texts2' : 'names texts'
        const followCount = isDark
          ? 'follow-count texts2'
          : 'follow-count texts'
        const followSub = isDark
          ? 'follow-count texts2 count'
          : 'follow-count texts count'
        const bioName = isDark ? 'bio-name texts2' : 'bio-name texts'
        const bio = isDark ? 'bio texts2' : 'bio texts'
        const gridIcon = isDark ? 'grid-icon texts2' : 'grid-icon texts'
        const postHead = isDark ? 'post-head texts2' : 'post-head texts'

        const {
          id,
          userId,
          username,
          profilePic,
          postsCount,
          followersCount,
          followingCount,
          userBio,
          posts,
          stories,
        } = profile

        return (
          <li className="profile-info-container" key={id}>
            <div className="profile-info">
              <img
                className="profile-image"
                alt={`${my} profile`}
                src={profilePic}
              />
              <div className="profile-details">
                <h1 className={profileName}>{username}</h1>
                <div className="follow-count-container">
                  <div className="count-container">
                    <p className={followCount}>Posts</p>
                    <span className={followSub}>{postsCount} </span>
                  </div>
                  <div className="count-container">
                    <p className={followCount}>Followers</p>
                    <span className={followSub}>{followersCount} </span>
                  </div>
                  <div className="count-container">
                    <p className={followCount}>Following</p>
                    <span className={followSub}>{followingCount} </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bio-container">
              <p className={bioName}>{userId}</p>
              <p className={bio}>{userBio}</p>
            </div>
            <ul className="user-stories-lists">
              {stories.map(each => (
                <li key={each.id} className="story-image">
                  <img className="image" alt={`${my} story`} src={each.image} />
                </li>
              ))}
            </ul>
            <hr className="line" />
            <div className="posts-container">
              <div className="header-container">
                <BsGrid3X3 className={gridIcon} />
                <h1 className={postHead}>Posts</h1>
              </div>
              <UserPosts posts={posts} my={my} />
            </div>
          </li>
        )
      }}
    </SearchContext.Consumer>
  )
}
export default ProfileCard
