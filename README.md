## Personal Challenges to practice typescript/javascript

Challenge: Create a simple to-do list web application using HTML, CSS, and JavaScript.

The application should have the following features:

A form that allows the user to enter a new to-do item and add it to the list.
A list that displays all of the to-do items that have been added.
A checkbox next to each to-do item that allows the user to mark the item as completed.
A button that removes all completed items from the list when clicked.
You can use any front-end framework or library that you are comfortable with.

Here are some specific requirements for the application:

The form should only allow the user to add a new to-do item if the input is not empty.
The list should be displayed in the order that the items were added, with the most recent item at the top.
When the user marks an item as completed, the text of the item should be struck-through to indicate that it has been completed.
The remove button should be disabled if there are no completed items in the list.

# WHAT I DID

I used Tyepcript, HTML and CSS

<p>tsc --init => to get access to the typescript configuration file</p>
<p>tsc --watch => to watch all the changes automatically</p>

<p>./dist => for the output of the javascript code</p>
<p>./src => all my source folders</p>

The style and semantic weren't my main focus.
<ul>
  <li>The user is able to add a new to-do item with an empty input</li>
  <li>The list is displayed in order that the items were added</li>
  <li>By double clicking on the to-do title, the to-do is placed as completed</li>
  <li>Added edit and delete button.</li>
  <li>Used localStorage to save the to-do items (key, value);</li>
</ul>

# WHAT I LEARNED
The confirm() method displays a dialog box with a message, an OK button, and a Cancel button. Returns true or false; <i>web3schools</i>
<p>The localStorage read-only property of the window interface allows you to access a Storage object for the Document's origin; the stored data is saved across browser sessions.</p> <i>developer.mozilla</i>

See the project live => (working on it :D)




