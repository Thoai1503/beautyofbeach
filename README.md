This is my fullstack project

To start the project Thoai1503/beautyofbeach after cloning it to your PC, follow these steps based on the README files found:

Back-End (Laravel)
Clone the repository:

--bash
git clone https://github.com/Thoai1503/beautyofbeach.git
cd beautyofbeach/back-end
Install dependencies:

--bash
composer install
Set up environment variables:

- Copy the .env.example file to .env:

--bash
cp .env.example .env
Open the .env file and configure your database and other environment variables.

- Generate application key:

--bash
php artisan key:generate
Run database migrations:

--bash
php artisan migrate
Start the development server:

--bash
php artisan serve

Front-End (Create React App)

- Navigate to the front-end directory:

--bash
cd ../front-end
Install dependencies:

--bash
npm install
Start the development server:

--bash
npm start
