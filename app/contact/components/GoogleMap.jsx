export default function GoogleMap() {
  return (
    <div className="overflow-hidden rounded-lg shadow">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.548716668312!2d90.4125184748011!3d23.80409398662216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7bcd43f3b15%3A0x64a7c9f1811d1e91!2sDhaka!5e0!3m2!1sen!2sbd!4v1696599887152!5m2!1sen!2sbd"
        width="100%"
        height="250"
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}
