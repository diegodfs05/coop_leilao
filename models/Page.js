class Page {
    constructor(title) {
      this.title = title;
      this.navbarItems = [];
    }
  
    addNavbarItem(name, link) {
      this.navbarItems.push({ name, link });
    }
  
    getNavbar() {
      return this.navbarItems;
    }
}
  
module.exports = Page;
  