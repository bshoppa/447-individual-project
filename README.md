# 447-individual-project
Webapp for basic crud operations

## Notes for windows installation
There is an issue with the python installation in windows that prevents SQLalchemy from being used, as the main flask server and incoming http requests persist on different threads. This leads to the database not working.
For this reason, I recommend using the linux setup where SQLalchemy actually works without any hassle.

- On saturday I figured out how to disable this behavior, so that both the flask database server and the react webhost server now work on windows. Note that this is probably an unsafe use of SQLalchemy and should be avoided.
Because the python server is still multithreaded, it just doesn't care anymore about the problems that might come from it.
