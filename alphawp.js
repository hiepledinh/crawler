const puppeteer = require('puppeteer');
const downloader = require('image-downloader');
const createPuppeteerPool = require('puppeteer-pool')
const fs = require('fs');

const folder = '../public/images';

const timeout = (ms => new Promise(resolve => setTimeout(resolve, ms)));

(async () => {
        const browser = await puppeteer.launch();
        let imgSrcSet = [];

        const pool = createPuppeteerPool({
            max: 5, // default
            min: 2, // default
            idleTimeoutMillis: 30000, // default.
            maxUses: 500, // default
            validator: () => Promise.resolve(true), // defaults to always resolving true
            testOnBorrow: true, // default
            puppeteerArgs: []
        });

        try {
            const instaUrl = ['https://www.instagram.com/haneul__haneul/'];
            for (let utl of instaUrl) {
                imgSrcSet = await getImageUrlFromPage(browser, utl);
                console.log('Loading done with total items: ' + imgSrcSet.length);

                pool.use(async (browser) => {
                    for (let url of imgSrcSet) {
                        let itemUrl = 'https://www.instagram.com' + url;
                        let imgSrcSetInner = await getImageFromPage(browser, itemUrl);

                        let i = 1;
                        if (imgSrcSetInner && imgSrcSetInner.length > 0) {
                            await Promise.all(imgSrcSetInner.map(image => downloader.image({
                                url: image,
                                dest: folder
                            }))).catch((e) => {
                                console.log('error:' + e);
                                i++;
                                fs.writeFile('error.txt', imgSrcSetInner + '\r\n', function (err) {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    console.log("The error file was saved!");
                                });
                            }).finally(() => {
                                console.log("------Download done----" + imgSrcSetInner.length);
                            });
                        }
                    }
                    return 1;
                });
            }
            pool.drain().then(() => pool.clear());
        } catch (e) {
            console.error(e);
        } finally {
            await browser.close();
        }

    }
)()

async function getImageFromPage(browser, url) {
    let imgSet = [];
    let page;
    try {
        page = await browser.newPage();
        await page.goto(url);
        const imageLength = await page.evaluate(() => {
            let imgNumber = document.querySelectorAll('._-1_m6').length;
            return imgNumber;
        });
        console.log('Done loading page: ' + url + ' with total length: ' + imageLength);
        switch (imageLength) {
            case 0:
                imgSet = await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                });
                break;
            case 1:
            case 2:
                imgSet = await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                });
                break;
            case 3:
                await page.click('.coreSpriteRightChevron');
                await timeout(100);
                imgSet = await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                });
                break;
            case 4:
                imgSet = await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                });
                await page.click('.coreSpriteRightChevron', {clickCount: 3, delay: 300});
                await timeout(400);
                imgSet = imgSet.concat(await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                }));
                break;
            case 5:
                imgSet = await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                });
                await page.click('.coreSpriteRightChevron', {clickCount: 3, delay: 300});
                await timeout(400);
                imgSet = imgSet.concat(await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                }));
                break;
            case 6:
                await page.click('.coreSpriteRightChevron');
                imgSet = await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                });
                await page.click('.coreSpriteRightChevron', {clickCount: 3, delay: 300});
                await timeout(400);
                imgSet = imgSet.concat(await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                }));
                break;
            case 7:
                imgSet = await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                });
                await page.click('.coreSpriteRightChevron', {clickCount: 3, delay: 300});
                await timeout(400);
                imgSet = imgSet.concat(await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                }));
                await page.click('.coreSpriteRightChevron', {clickCount: 3, delay: 300});
                await timeout(400);
                imgSet = imgSet.concat(await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                }));
                break;
            case 8:
                imgSet = await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                });
                await page.click('.coreSpriteRightChevron', {clickCount: 3, delay: 300});
                await timeout(400);
                imgSet = imgSet.concat(await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                }));
                await page.click('.coreSpriteRightChevron', {clickCount: 3, delay: 300});
                await timeout(400);
                imgSet = imgSet.concat(await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                }));
                break;
            case 9:
                await page.click('.coreSpriteRightChevron');
                imgSet = await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                });
                await page.click('.coreSpriteRightChevron', {clickCount: 3, delay: 300});
                await timeout(400);
                imgSet = imgSet.concat(await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                }));
                await page.click('.coreSpriteRightChevron', {clickCount: 3, delay: 300});
                await timeout(400);
                imgSet = imgSet.concat(await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                }));
                break;
            case 10:
                imgSet = await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                });
                await page.click('.coreSpriteRightChevron', {clickCount: 3, delay: 300});
                await timeout(400);
                imgSet = imgSet.concat(await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                }));
                await page.click('.coreSpriteRightChevron', {clickCount: 3, delay: 300});
                await timeout(400);
                imgSet = imgSet.concat(await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                }));
                await page.click('.coreSpriteRightChevron', {clickCount: 3, delay: 300});
                await timeout(400);
                imgSet = imgSet.concat(await page.evaluate(() => {
                    let listItem = Array.from(document.querySelectorAll('.FFVAD'));
                    return listItem.map(i => i.getAttribute('src'));
                }));
                break;
            default:
                return null;
        }
        console.log('Done loading page: ' + url + ' has actual ' + imgSet.length + ' items!');
        return imgSet;
    } catch (e) {
        console.error(e);
    } finally {
        page.close();
    }
}

async function getImageUrlFromPage(browser, url) {
    const page = await browser.newPage();
    page.setViewport({width: 1920, height: 1080});
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    console.log('----Creating page done: ' + url);
    const imgSrcSet = await scrapeInfiniteScrollImgUrl(page, extractItemUrl);
    await page.close();
    return imgSrcSet;
}

async function scrapeInfiniteScrollImgUrl(page, extractItems, scrollDelay = 700) {
    let items = [];
    try {
        let previousHeight = 0;
        let totalHeight = 0;
        let tmp = [];
        while (totalHeight >= previousHeight) {
            tmp = await page.evaluate(extractItems);
            items = items.concat(tmp);
            previousHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
            await page.waitFor(scrollDelay);
            totalHeight += previousHeight;
            console.log('Load another ' + tmp.length + ' items!');
        }
        console.log("Total number items loaded: " + items.length);
    } catch (e) {
        console.error('error: ' + e);
    }
    return items;
}

function extractItemUrl() {
    const imgSet = Array.from(document.querySelectorAll('article a'));
    const srcSetAttribute = imgSet.map(i => i.getAttribute('href'));
    return srcSetAttribute;
}
