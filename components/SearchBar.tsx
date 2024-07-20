"use client"

import { scrapeAndStoreProduct } from '@/lib/actions';
import { url } from 'inspector'
import React, { FormEvent, useState } from 'react'

const isValidAmazonProductURL = (url: string) => {
    try {
        const parsedURL = new URL(url);
        const hostname = parsedURL.hostname;

        // check if hostname contains amazon.com or amazon.

        if(hostname.includes('amazon.com') || 
        hostname.includes('amazon.') || 
        hostname.endsWith('amazon')) {
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;
}

const SearchBar = () => {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductURL(searchPrompt)

        if(!isValidLink) {
            return alert('Please enter a valid Amazon product link')
        }

        try {
            setIsLoading(true);

            // scrape the product page
            const product = await scrapeAndStoreProduct(searchPrompt);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
            setSearchPrompt(''); 
        }
    }

  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
        <input 
        value={searchPrompt}
        onChange={(e) => setSearchPrompt(e.target.value)}
        type="text"
        placeholder="Enter product link"
        className="searchbar-input"/>

        <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ''}>
            {isLoading ? 'Searching...' : 'Search'}
        </button>
    </form>
  )
}

export default SearchBar
