export const navigate = {
  afterNavigate(
    navigation: import('@sveltejs/kit').AfterNavigate
  ){
    navigation.from && console.log('afterNavigate ################ from\n',navigation.from.url.href)
    navigation.to && console.log('afterNavigate ################ to\n',navigation.to.url.href)
  },
  beforeNavigate(
    navigation: import('@sveltejs/kit').BeforeNavigate
  ) {
    navigation.from && console.log('beforeNavigate ################ from \n',navigation.from.url.href)
    navigation.to && console.log('beforeNavigate ################ to \n',navigation.to.url.href)
  }
}
