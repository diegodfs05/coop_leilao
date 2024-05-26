class Page {
    constructor(title) {
      this.title = title;
      this.navbarItems = [];
      this.pageContent = [];
      this.footerContent = [];
    }
  
    addNavbarItem(name, link) {
      this.navbarItems.push({ name, link });
    }
    addPageContent(htmlContent) {
      this.pageContent.push({ htmlContent});
    }
  
    getNavbar() {
      return this.navbarItems;
    }
}
  
module.exports = Page;
  