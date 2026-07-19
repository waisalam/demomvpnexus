export default function About() {
  return (
    <main className="container">
      <header className="app-header">
        <h1 className="app-title">About Todo App</h1>
      </header>

      <section className="about-section">
        <h2>Purpose</h2>
        <p>
          This Todo App helps you organize tasks efficiently. It demonstrates a modern React
          stack with state management, theming, and filtering capabilities.
        </p>
      </section>

      <section className="about-section">
        <h2>Features</h2>
        <ul>
          <li>Add, toggle, and delete todos</li>
          <li>Filter tasks by All, Active, or Done</li>
          <li>Dark/light theme toggle via context</li>
          <li>Persistent state using a Zustand-like store</li>
          <li>Responsive design with mobile-first layout</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Technologies Used</h2>
        <ul>
          <li><strong>React 19</strong> – UI library</li>
          <li><strong>TypeScript</strong> – type safety</li>
          <li><strong>Vite</strong> – fast build tool and dev server</li>
          <li><strong>Zustand-like store</strong> – lightweight state management (via custom hooks)</li>
          <li><strong>React Context</strong> – theme management</li>
          <li><strong>CSS</strong> – scoped styling with BEM-like classes</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Usage Instructions</h2>
        <ol>
          <li>Type a task in the input field and press <kbd>Enter</kbd> or click <strong>Add</strong>.</li>
          <li>Click a todo to mark it as done/undone.</li>
          <li>Use the filter buttons to view All, Active, or Done tasks.</li>
          <li>Toggle the theme using the moon/sun icon in the header.</li>
          <li>All changes are saved automatically in your browser&apos;s localStorage.</li>
        </ol>
      </section>
    </main>
  );
}