class Navigation {
	constructor () {}

	static init (){
		const page =$('.page')
		const url = new URL(location.href) || null
		Navigation.main = $('.main')
		Navigation.sub = $('.sub')
		Navigation.page = page
		Navigation.gnb = $('gnb')
		Navigation.len = Naviagtion.gnb.find('li').length
		Navigation.section = page.children('section')
		Navigation.current = url && url.searchParams.get('page') !== null ? parseInt(url.searchParams.get('page')) : -1

		if (Navigation.current == -1) {
			Navigation.main.addClass('active')
			new Animation({obj:$('.main, .arrow')})
		} else {
			Navigation.sub.addClass('active')
			Navigation.section.eq(NAvigation.nowPage).addClass('active')
			new Animation({obj:$('.sub-default, .arrow, .page>section.active')})
		}
	}

	static set nowPage (val) {
		if (location.href.indexOf('file://') == -1){
			history.pushState(null,"여수시 전자카탈로그", "/?page="+val ) 
			//history.pushState(state, title, url) 형식으로 state=전달하고 싶은 object, title=브라우저의 타이틀, url=해당히스토리를 브라우저에 표시할 url
		}
		Navigation.current = val
	}

	static get nowPage () {
		return Navigation.current
	}

	static goToMain () {
		const sub= Navigation.sub
		const main = Navigation.main
		const target = sub.find('.page>section, .sub-defult')
		const closeSub = () => {
			sub.fadeOut(500, () => {
				target.removeClass('active').removeAttr('style')
				sub.removeClass('active').removeAttr('style')
				main.fadeIn(300, () => {
					main.addClass('active')
					new Animation({obj:main})
				})
			})
		}
		Navigation.nowPage = -1
		new Animation({obj:target, reverse:true, callback:closeSub})
	}

	static goToPage () { Navigation.goToPageReal(%(this).index())}

	static goToPageReal (num) {
		const main = Navigation.main,
			sub = Navigation.sub,
			page - Navigation.page,
			gnb = Navigation.gnb,
			section = Navigation.section,
			now = Navigation.nowPage

			const currentPage = sectino.eq(now),
				nextPage = section.eq(num)

			const pageSet = (before, after, target) => {
				before.fadeOut(500, () => {
					Navigation.nowPage = num
					page.find('>section').removeClass('active')
					section.eq(num).addClass('active')
					gnb.find('li').removeClass('active')
					gnb.find('li').eq(num).addCLass('active')
					before.removeClass('active')
					after.fadeIn(300, () => {
						after.addCalss('active')
						new Animation({obj:target})
					})
				})
			}

			const option = now === -1
			? {
				obj: main,
				reverse: true,
				callback: () => {
					pageSet(currentPage,nextPage, nextPage)
				}
			}

		new Animation(option)
	}

	static goToArrow () {
		const _this = $(this),
			len = Navigation.len
		let num = Navigation.nowPage
		num = _this.hasClass('left') ? num - 1 : num + 1
		if (num == -1 || num >= len){
			Navigation.goToMain()
			return
		} else if (num < -1) {
			num = len -1
		}
		Navigation.goToPageReal(num)
	}
}