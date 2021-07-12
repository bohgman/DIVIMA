# DIVIMA
Digital visitor management

# Business description
For our customers in public objects, facilities and at events
The Be Secure GmbH is a competent and experienced specialist for security services in objects, facilities, events, and more.
The company started its work under the name Be Secure GmbH with effect from October 1, 2008, and quickly met the increasing importance of the topic of security from the customer's point of view and the higher demands on security management at eight locations meanwhile more than 250 security personnel are on duty in Berlin, Brandenburg, and Sachsen.
As a security service provider, we create comprehensive and needs-based concepts, derive personnel, technical and organizational measures from them, and implement them.
Be Secure GmbH attaches great importance to well-qualified personnel, modern and innovative processes, efficient communication with our customers and within our growing company as well as compliance with personal and data protection regulations.
Our field of activity essentially comprises three areas:

- Security-Consulting
- Services for objects and facilities
- Services at events

The focus is on sustainable cooperation with our customers.

# Description of the order
Be Secure GmbH provides a high level of objective security, protection against unwanted access, and thus protection against damage through its presence and professional approach. By objects, we understand areas worthy of protection, which partly represent operation-critical infrastructural facilities or house valuable goods. These include, for example, office buildings or building complexes, industrial plants, construction sites, and others. These objects are protected against vandalism, sabotage, and theft.
In this context, gate services also are within our scope of duties, which includes the admission and documentation of visitors as well as the allocation of keys or parking spaces. In the process, a lot of documents accumulate over a longer period of time, which have to be archived. In addition, the entry in visitor lists, in which previous visitors can be viewed, is questionable from a data protection perspective.(In the future, we would like to have a digital signing process for this service. However, this is not part of this order but the basis for further developments.)
During digitization, we would therefore like to develop a WebApp that can be used to manage visitor management and the allocation of visitor cards, keys, and parking spaces. For this purpose, different types of visits (such as internal, external, and service providers) should be able to be created. Optionally, a key and/or a parking space can be assigned to a visitor. These should be able to be created separately. In this order, for now only a version for our own branch offices is to be implemented.
As the name of the application, we have chosen the name DIVIMA (Digital visitor management). This should be callable under the domain https://bs-divima.com/.

# Description of the functions
## ---> Visits:
The following functions are to be implemented for a visit:
Sign in, sign out (when the guest leaves the object), edit, view, delete
when creating a visit, a checkbox "Get signature" should be activated by the user
after unsubscribing, the entry should no longer be editable
if a key has been assigned, a checkbox "Key returned" should be activated by the user when logging out.
if a parking slot has been assigned, a checkbox "Park slot free" should be activated by the user when logging out.

Each visit has the following attributes:

- Visit ID
- Location of the visit
- Visitor ID
- Short description (title) of the visit
- Date of the visit
- Time of arrival (create) and departure (sign out)
- Key (optional)
- Parking place (optional)

## ---> Visitors:
The following functions are to be implemented for a visitor:

- Registration (Create)
- Edit/Delete/List

There are three types of visitors:
- internal visitors
- external visitors
- service providers (such as suppliers and craftsmen).

Attributes for visitors:
- id
- name

Attributes for internal visitors:
- assigned branch office (Berlin Central, Berlin South, Berlin West, Chemnitz, Cottbus, Dresden, Leipzig, Potsdam)
- Key (optional)

Attributes for external visitors:
- Name of the company
- visitors email address

Attributes for service providers
- Name of the company
- Key (optional)

## ---> Locations:
The following functions should be implemented for a location:
create, edit, view, delete

A location has the following attributes:

- Location ID
- Location name

## ---> Key:
The following functions should be implemented for a key:
create, edit, view, delete

A key has the following attributes:

- Key ID
- Key name
- Location
- short description (title) of the assigned visit if the key is currently issued (in the visitor list, the key title should be documented even after the sign-out, if possible)
- Is available

## ---> Parking lot:
The following functions are to be implemented for a parking lot:
create, edit, view, delete

A parking lot has the following attributes:

- Parking lot ID
- Parking lot name
- Location
- Short description (title) of the visit, if currently issued
- Is available

### Domain Model

![Assignment7b-2](https://user-images.githubusercontent.com/73166570/123088125-a5794a00-d425-11eb-811f-00c56e504cd2.png)


### Design Model

![Assignment7b-3](https://user-images.githubusercontent.com/73166570/123088151-aca05800-d425-11eb-8254-2c4d9d3eb4ba.png)



- F1	Implementation of user authentication status - Mattia.

- F2	Redirection to Sign in/up page - Mattia.

- F3	Email verification with customized page - Daria.

- F4	Implementation of enable/disable UI elements in start page	- Mattia.

- F5	Implementation of Sign out - Daria.

- F6	Implementation of 404 page - Daria.


- ASSIGNEMENT 7c

Dallai = Keys, Locations, Parkings