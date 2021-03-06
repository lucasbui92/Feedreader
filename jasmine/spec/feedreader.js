/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        describe('URLs', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                var feed = allFeeds[i];
                it('are defined', function() {
                    expect(feed.url).toBeDefined();
                    expect(feed.url.length).not.toBe(0);
                });
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         describe('Names', function() {
             for(var i = 0; i < allFeeds.length; i++) {
                 var feed = allFeeds[i];
                 it('are defined', function() {
                     expect(feed.name).toBeDefined();
                     expect(feed.name.length).not.toBe(0);
                 });
             }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        var menu = document.querySelector(".menu-hidden");
        var menu_icon = document.querySelector(".menu-icon-link");

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
         it('is hidden by default', function() {
             // The class 'menu-hidden' is embedded at the beginning in the body
             expect(menu.classList).toContain("menu-hidden");
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it('displays when clicked and hides when clicked again', function() {
              // Displays the menu
              menu_icon.click();
              expect(menu.classList).not.toContain("menu-hidden");

              // Hides the menu
              menu_icon.click();
              expect(menu.classList).toContain("menu-hidden");
          });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
             loadFeed(0, done);
         });

         /* Retrieve all the .entry items in the .feed container and checks
          * whether the number of items are larger than done
          */
         it('At least an .entry element in the .feed container', function() {
             var feed_container = document.querySelector('.feed');
             var all_entries = feed_container.querySelectorAll('.entry');
             expect(all_entries.length).toBeGreaterThan(0);
         });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var oldFeed;

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = document.querySelector('.feed').innerText;
                loadFeed(1, done);
            });
         });

         /* The old feed was stored thus the feed is modified so this checks
          * whether the feed has changed
          */
         it('The content has changed', function() {
            currentFeed = document.querySelector('.feed').innerText;
            expect(currentFeed).not.toBe(oldFeed);
         });
    });
}());
