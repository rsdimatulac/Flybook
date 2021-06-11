# Welcome to Flybook!

### **Live Link: [Flybook](https://theflybook.herokuapp.com/)**

_[Flybook](https://theflybook.herokuapp.com/)_, a pixel perfect [Facebook](https://facebook.com/) clone, is a popular social media website that allows users to publicly share profile, share posts, leave comments, and add other users as friends.

### News Feed View
![News Feed View](react-app/public/feed.gif)

### Profile View
![Channels View](react-app/public/profile.gif)

## Prerequisites

Before you begin, please check the following Wiki documents:
* [Feature List](https://github.com/rsdimatulac/Flybook/wiki/Feature-List)
* [Database Schema](https://github.com/rsdimatulac/Flybook/wiki/Database-Schema)
* [API Routes](https://github.com/rsdimatulac/Flybook/wiki/API-Routes)
* [Frontend Routes](https://github.com/rsdimatulac/Flybook/wiki/Frontend-Routes)

## Technologies used:
#### Backend
* Python
* Flask
* SQLAlchemy
* PostgreSQL
* Docker
* `wtforms`, `wtforms validators`
<!-- * `socket.io` for friend_requests -->

#### Frontend
* React.js
* Redux
* JavaScript
* HTML, Vanilla CSS
* Heroku (for hosting services)
* AWS (photo bucket)
* Material UI Icons
* `react-icons`, `date-fns`

### Code Highlights / Challenges

#### Highlights 

* These code shows how to correctly determine the join condition between parent/child tables when having multiple foreign keys that are referencing the same table. In this case, the Post model below have two foreign keys `user_id` and `wall_id` that are pointing to the `users.id` in the User model. By explicitly adding `foreign_keys` argument on both relationships will help SQLAlchemy know how to handle these conditions and not throw an `AmbiguousForeignKeysError`.

`app/models/user.py`
```js
post_sender = db.relationship(
    'Post',
    back_populates='post_user_id',
    foreign_keys=Post.user_id,
    cascade='all, delete-orphan'
)

post_receiver = db.relationship(
    'Post',
    back_populates='post_wall_id',
    foreign_keys=Post.wall_id,
    cascade='all, delete-orphan'
)
```

`app/models/post.py`
```js
user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
wall_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

post_user_id = db.relationship(
    'User',
    back_populates='post_sender',
    foreign_keys=user_id
)

post_wall_id = db.relationship(
    'User',
    back_populates='post_receiver',
    foreign_keys=wall_id
)
```

* When a user activates the search bar, the search dropdown will show. Based on the search input values, the `handleSearch()` function is invoked when an `onChange()` event occurs. It uses `.filter()` to iterate through the channels and dynamically displays and returns what matches the search input value. When a user clicks on the search result, they will be redirected to the user profile.

`react-app/src/components/NavBar.js`
```js
const handleSearch = (e) => {
    if (e.target.value === "") {
      setSearchInput("");
      setSearchResults([]);
    };

    if (e.target.value.length > 0) { 
      let filteredResults = Object.values(users).filter(user => 
        user['firstname']?.toLowerCase().includes(e.target.value.toLowerCase())
        || user['lastname']?.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchInput(e.target.value);
      setSearchResults(filteredResults);
    };
  };
```

#### Challenges
* My biggest challenge was getting an `AmbiguousForeignKeysError` by not setting the proper foreign key relationship between User and Post models. In the Post model, I have two foreign keys `user_id` and `wall_id` that are both referencing the `users.id` in the User model. After parsing through SQLAlchemy documentation, I was able to setup the proper relationship by explicitly adding `foreign_keys` argument on both models and correctly determined the join condition between parent/child tables. See code snippet above.


## Future Implementations 
- Friend Requests
- Notifications
- Dark mode
- Responsive design

## Flybook Developer
- [@rsdimatulac](https://github.com/rsdimatulac) 🚁

---
_© 2021 Flybook. No rights reserved._
