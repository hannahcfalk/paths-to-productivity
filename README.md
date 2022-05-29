# paths-to-productivity
Have you ever wanted to complete a large task, but need help breaking it down into manageable chunks?
This site allows you to build a tree breaking down a large project into smaller tasks, and enables you to 
make use of other users' work to help build your tree.

## Tutorials used
- https://nmingaleev.medium.com/how-to-create-a-tree-component-with-react-hooks-933d0c50c05b
- https://www.geeksforgeeks.org/integrating-django-with-reactjs-using-django-rest-framework/
- https://react-bootstrap.github.io/forms/validation/

### Getting started
This project uses Django Rest Framework (https://www.django-rest-framework.org/) for the backend and React (https://reactjs.org/) for the frontend

To host this project locally:

*Django Rest Framework*
1. Navigate to the `paths-to-productivity-backend` directory and activate the virtual environment (how to do this will depend on your OS, see https://docs.python.org/3/library/venv.html# for additional information)
2. cd into ptp_backend
3. Run `python manage.py migrate` to populate the DB, then `python manage.py runserver` to run it

*React*
1. Navigate to the `paths-to-productivity` directory
2. Run `npm start` to launch the site


