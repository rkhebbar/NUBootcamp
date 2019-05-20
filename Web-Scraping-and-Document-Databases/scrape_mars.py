# coding: utf-8

#Imports & Dependencies
from splinter import Browser
from bs4 import BeautifulSoup as bs
import pandas as pd

#Site Navigation
executable_path = {'executable_path': '/Users/rishihebbar/Documents/Bootcamp/NUCHI201902DATA3/chromedriver'}
browser = Browser('chrome', **executable_path, headless=False)


# Defining scrape & dictionary
def scrape():
    final_data = {}
    output = marsNews()
    final_data["mars_news"] = output[0]
    final_data["mars_paragraph"] = output[1]
    final_data["mars_image"] = marsImage()
    final_data["mars_weather"] = marsWeather()
    final_data["mars_facts"] = marsFacts()
    final_data["mars_hemisphere"] = marsHem()

    return final_data

# # NASA Mars News

def marsNews():
    url = 'https://mars.nasa.gov/news'
    browser.visit(url)
    html_news = browser.html
    soup_news = bs(html_news, 'html.parser')
    news_title = soup_news.find('div', class_='content_title').find('a').text
    news_p = soup_news.find('div', class_='article_teaser_body').text
    output = [news_title, news_p]
    return output

# # JPL Mars Space Images - Featured Image
def marsImage():
    image_url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(image_url)
    html = browser.html
    soup = BeautifulSoup(html, "html.parser")
    image = soup.find("img", class_="thumb")["src"]
    featured_image_url = "https://www.jpl.nasa.gov" + image
    return featured_image_url

# # Mars Weather
def marsWeather():
    
    url_tweet = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url_tweet)
    html_weather = browser.html
    soup_weather = bs(html_weather, "html.parser")
    mars_weather = soup_weather.find("p", class_="TweetTextSize TweetTextSize--normal js-tweet-text tweet-text").text
    
    return mars_weather


# # Mars Facts
def marsFacts():
    url_facts = 'https://space-facts.com/mars/'
    browser.visit(url_facts)
    table = pd.read_html(url_facts)
    table[0]
    df_mars_facts = table[0]
    df_mars_facts.columns = ["Description", "Values"]
    df_mars_facts.set_index(["Description"])
    return mars_facts
    
    mars_html_table = df_mars_facts.to_html()
    mars_html_table = mars_html_table.replace("\n", "")
    mars_html_table
    return mars_html_table

# # Mars Hemispheres
def marsHem():
    import time 
    hemispheres_url = "https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars"
    browser.visit(hemispheres_url)
    html = browser.html
    soup = BeautifulSoup(html, "html.parser")
    mars_hemisphere = []

    products = soup.find("div", class_ = "result-list" )
    hemispheres = products.find_all("div", class_="item")

    for hemisphere in hemispheres:
        title = hemisphere.find("h3").text
        title = title.replace("Enhanced", "")
        end_link = hemisphere.find("a")["href"]
        image_link = "https://astrogeology.usgs.gov/" + end_link    
        browser.visit(image_link)
        html = browser.html
        soup=BeautifulSoup(html, "html.parser")
        downloads = soup.find("div", class_="downloads")
        image_url = downloads.find("a")["href"]
        dictionary = {"title": title, "img_url": image_url}
        mars_hemisphere.append(dictionary)
    return mars_hemisphere
