from flask_admin.contrib.sqla import ModelView
#
# from __init__ import db
# from datetime import datetime
import leancloud


class Strings(leancloud.Object):
    @property
    def english(self):
        return self.get('english')

    @english.setter
    def english(self, value):
        # 同样可以给对象的 content 增加 setter
        self.set('english', value)

    @property
    def chinese(self):
        return self.get('chinese')

    @chinese.setter
    def chinese(self, value):
        # 同样可以给对象的 content 增加 setter
        self.set('chinese', value)


class HTMLs(leancloud.Object):
    @property
    def englishHTML(self):
        return self.get('englishHTML')

    @englishHTML.setter
    def englishHTML(self, value):
        # 同样可以给对象的 content 增加 setter
        self.set('englishHTML', value)


class Product(leancloud.Object):
    @property
    def title(self):
        return self.get('title')

    @title.setter
    def title(self, value):
        # 同样可以给对象的 content 增加 setter
        self.set('title', value)

    @property
    def description(self):
        return self.get('description')

    @description.setter
    def description(self, value):
        # 同样可以给对象的 content 增加 setter
        self.set('description', value)

    @property
    def detail(self):
        return self.get('detail')

    @detail.setter
    def detail(self, value):
        # 同样可以给对象的 content 增加 setter
        self.set('detail', value)

    @property
    def cover(self):
        return self.get('cover')

    @cover.setter
    def cover(self, value):
        # 同样可以给对象的 content 增加 setter
        self.set('cover', value)


class Order(leancloud.Object):
    @property
    def title(self):
        return self.get('title')

    @title.setter
    def title(self, value):
        self.set('title', value)

    @property
    def price(self):
        return self.get('price')

    @price.setter
    def price(self, value):
        self.set('price', value)

    @property
    def status(self):
        return self.get('status')

    @status.setter
    def status(self, value):
        self.set('status', value)

    @property
    def user(self):
        return self.get('user')

    @user.setter
    def user(self, value):
        self.set('user', value)

    @property
    def email(self):
        return self.get('email')

    @email.setter
    def email(self, value):
        self.set('email', value)

    @property
    def phone(self):
        return self.get('phone')

    @phone.setter
    def phone(self, value):
        self.set('user', value)

    @property
    def address(self):
        return self.get('address')

    @address.setter
    def address(self, value):
        self.set('address', value)


if __name__ == '__main__':
    string = Strings()
    string.english = 'test'
    string.save()
