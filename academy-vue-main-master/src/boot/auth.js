import { LocalStorage } from "quasar";
import { api } from 'boot/axios'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    // Now you need to add your authentication logic here, like calling an API endpoint
    let token = LocalStorage.getItem("token")
    api.post('auth/getAuthenticatedUser', {
      token: token
    })
      .then((res) => {
        if (res.data.msg == "Token Invalid" || res.data.msg == "Token Absent") {
          LocalStorage.remove('token')
        }
        // else if (res.data.msg == "Token Expired") {
        //   api.post('auth/refresh', {
        //     token: token
        //   }).then((res) => {
        //     LocalStorage.set('token', res.data.access_token)
        //   })
        // }
        api.post('auth/refresh', {
          token: LocalStorage.getItem('token')
        }).then((res) => {
          LocalStorage.set('token', res.data.access_token)
        })
      }).catch((err) => {
        console.log(err)
      })


    var url = window.location;
    if (url.href.includes('checkout')) {
      var newURL = url.href;
      var course = newURL.toString().split("/").reverse()[1];
      // console.log(course);
      LocalStorage.set('course', '/course/'+course+'/checkout')
      LocalStorage.set('checkout', 1)
    } else {
      // console.log("The word Example is not in the string.");
      LocalStorage.set('checkout', 0)
    }
    // console.log(url.href);

    // setInterval(function(){alert("Hello")},3000);


    if (to.path === "/admin") {
      next()
    } else if (!token && to.path !== "/login") {
      next("/login");
    } else if (token && to.path === "/login") {
      next("/")
    } else {
      next()
    }
  })
}
