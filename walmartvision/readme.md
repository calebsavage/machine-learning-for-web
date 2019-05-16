# WalmartVision
## Caleb Savagde - Machine Learning for the Web Spring 2019 at NYU ITP

This project uses the MobileNet model and your device's webcam to detect and identify common objects in your surroundings. It uses this data to build a "consumer profile" and then serve you ads for Walmart products you might be interested in. While this is a relatively naive implementation of targeted advertising technology, it's intended as a comment on the ease of leveraging machine learning to incrementally chip away at individual privacy.

On a technical level, the project uses the following technologies:
- MobileNet model
- ML5.js, a wrapper for TensorFlow
- P5.js for on-screen graphics
- WalmartLabs Product Search API
- A server-side PHP script to query the Walmart product search API and cache the results.

A live demo is not currently available, but a demo video is shown below. You can run it on your local machine by cloning this folder and starting a PHP command-line webserver inside the directory:

`$ cd walmartvision`

`$ php -S localhost:8000`

Navigate your browser to localhost:8000 to view the project.

[![Demo Video](https://img.youtube.com/vi/AoAhiwK5JjI/0.jpg)](https://www.youtube.com/watch?v=AoAhiwK5JjI)