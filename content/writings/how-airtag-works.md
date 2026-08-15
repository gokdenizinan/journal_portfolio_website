---
title: "How AirTag Works?"
slug: "how-airtag-works"
date: "2026-07-27"
displayDate: "Jul 27, 2026"
listDate: "Jul 2026"
description: "A step-by-step explanation of how AirTag uses Bluetooth, nearby Apple devices, Ultra Wideband, and encrypted location reports."
category: "Technology"
kind: "essay"
featured: true
---
<p>A couple of days ago, I wondered: how does AirTag work?</p>
      <p>There are lots of GPS devices mainly used to track something you have lost. But I think Apple's AirTag is special in one sense: it is not a GPS device. It relies on nearby Apple devices and their location services to make its location known to the owner.</p>
      <p>The main flow looks like this: you have an AirTag, a stranger's iPhone passes near it, your AirTag broadcasts a Bluetooth signal, the iPhone creates an encrypted location report for the Find My network, and then that report becomes available on your iPhone.</p>
      <p>So let's go step by step.</p>

      <h2>Step One: Periodic Bluetooth Whispering</h2>
      <p>When you leave an item behind, AirTag periodically whispers over Bluetooth. In a simplified way, it says something like: an item with temporary identity X is nearby.</p>
      <p>This identity changes frequently so that observers cannot easily track the same AirTag over time. Your AirTag is emitting a Bluetooth radio signal, but the identity inside that signal keeps rotating.</p>
      <p>Let's imagine that you forget your backpack, or maybe you lose it, and luckily you have an AirTag attached to it. The AirTag does not have its own GPS locator. It broadcasts Bluetooth signals instead.</p>
      <p>When a stranger passes by with an iPhone, their phone can detect the AirTag nearby and attach its own approximate location to that detection. This location may come from GPS, Wi-Fi, cellular data, or other location signals available to the iPhone at that moment.</p>
      <p>Then, using the internet connection of that iPhone, an encrypted location report is sent to Apple's Find My service. When you open Find My on your own iPhone, your device can decrypt the relevant report and show you an approximate location.</p>

      <h2>Step Two: How Precision Finding Works</h2>
      <p>For the wider Find My network, a nearby iPhone can provide three important things:</p>
      <ul>
        <li>a location,</li>
        <li>an internet connection,</li>
        <li>and the ability to upload a report to the Find My network.</li>
      </ul>
      <p>Precision Finding is a more local feature. It is what happens when you are near your AirTag and you use a compatible iPhone to find it more precisely.</p>
      <p>Bluetooth can help your phone understand whether the AirTag is somewhere nearby. But if you have an iPhone with Ultra Wideband, usually abbreviated as UWB, you can see much more detail, such as: it is approximately 3 metres away and in this direction.</p>

      <h2>How Distance Works</h2>
      <p>Imagine you have a compatible iPhone with Ultra Wideband. Your iPhone and the AirTag exchange very short radio pulses, and the phone measures the timing of that exchange.</p>
      <p>From basic physics, we know that distance is equal to velocity multiplied by time:</p>
      <p><code>distance = velocity x time</code></p>
      <p>So we can approximately say:</p>
      <p><code>d ~= (round_trip_time x c) / 2</code></p>
      <p>Here, <code>c</code> represents the speed of light, because radio waves travel at roughly that speed.</p>
      <p>Why do we say this is approximate? Because the real-world measurement is affected by timing precision, hardware calibration, signal paths, and the environment.</p>
      <p>Why do we divide by 2? Because the time includes the journey from the iPhone to the AirTag and the journey back again. If we did not divide by 2, we would be counting the distance twice.</p>

      <h2>How Direction Works</h2>
      <p>Direction is trickier than distance, and Apple does not publish every engineering detail. In general, a compatible iPhone can combine Ultra Wideband spatial information with its own sensors to understand where the AirTag is relative to the phone.</p>
      <p>So the iPhone acts a bit like a compass for the nearby item. Apple says Precision Finding fuses input from the camera, ARKit, the accelerometer, and the gyroscope, alongside Ultra Wideband, to provide a directionally aware finding experience.</p>

      <h2>Step Three: How AirTag Protects Location Privacy</h2>
      <p>A stranger's iPhone can report the location without knowing that the AirTag is yours. Apple also cannot simply read that location. The location report is encrypted, and the stranger's iPhone does not know whose AirTag it has detected.</p>
      <p>Imagine I have an AirTag. We can call it Gokdeniz's AirTag, and imagine that its serial number is 1234. Other devices do not see it like that.</p>
      <p>Instead, they see temporary identities. For example:</p>
      <ul>
        <li>at 10:00, the ID is X74,</li>
        <li>at 10:15, the ID is P4B,</li>
        <li>at 10:20, the ID is M9C.</li>
      </ul>
      <p>The identity keeps changing so that it cannot be tracked easily by ill-intended people.</p>
      <p>With that information, the stranger's iPhone creates a report that looks something like this:</p>
      <ul>
        <li>temporary ID: P4B,</li>
        <li>location: Amsterdam Centraal,</li>
        <li>time: 14:32.</li>
      </ul>
      <p>But this report is stored and sent in an encrypted way.</p>

      <h2>Public Keys, Private Keys, and a Mailbox Analogy</h2>
      <p>I want to continue with an analogy here, because this part can seem a bit confusing.</p>
      <p>Imagine you have a mailbox where everyone can put letters. This represents the public key. It is used for locking, or encrypting, the message.</p>
      <p>But with a mailbox, you still need a key to open it. In this case, only you have the key that can open and read the letters. This represents the private key, which is used for decrypting the message.</p>
      <p>For example, AirTag has a feature that allows you to share your AirTag's location with others. If you share that AirTag permission, the other person is also given authorised access to the information needed to read its location in Find My.</p>
      <p>Now imagine you have a lost backpack with an AirTag inside it. The AirTag broadcasts information that, in a simplified way, says: here is a public key, use it to lock any location report intended for my owner.</p>
      <p>A stranger passes by, their iPhone detects that signal, and then encrypts the location using that public key. For example, "Amsterdam Centraal" becomes something unreadable, like <code>753A9...</code>.</p>
      <p>Apple receives that encrypted location report through the Find My service, but Apple cannot read the location in plain language. When you open Find My on your iPhone, your device combines the private key with the encrypted location and turns it back into a readable location.</p>
      <p>Another analogy is colour mixing. If you have blue paint and yellow paint, it is easy to make green. But if you only have green paint, it is not practically possible to separate it back into perfect blue and yellow. This is not a perfect cryptography analogy, but it captures the same direction of difficulty: one operation is easy, while reversing it is not feasible in ordinary terms.</p>
      <div class="callout">
        <strong>Small math note <span class="math-symbol" aria-hidden="true">∑</span>:</strong> Apple uses elliptic curve public key cryptography. I want to explain the mathematics behind this in a separate math section later, and I will update this writing when that part is ready.
      </div>

      <div class="pdf-attachment">
        <div class="pdf-icon" aria-hidden="true">
          <span>PDF</span>
        </div>
        <div class="pdf-attachment-body">
          <h2><span class="math-symbol" aria-hidden="true">∑</span> Rough notes and mechanism sketches</h2>
          <p>If you want to see the handwritten notes and drawings behind this explanation, open the PDF below. The separate math PDF is still in progress and will be added later.</p>
          <a href="airtag-mechanism-notes.pdf" target="_blank" rel="noopener">Open the AirTag notes PDF →</a>
        </div>
      </div>

      <h2>Step Four: How AirTag Prevents Secret Tracking</h2>
      <p>When an AirTag is registered, Apple recognises its owner. In a simplified example, the system knows that AirTag 83F2 belongs to Gokdeniz's Apple account.</p>
      <p>Ownership can also be shared, which means you can give someone else permission to view the AirTag too.</p>
      <p>But passing strangers with AirTags do not trigger an alert immediately. If person A secretly puts an AirTag into person B's bag, the pattern needs to look suspicious over time before it becomes an unwanted tracking case.</p>
      <p>Imagine you are person B. You are at home, then you go to school, and later you go to work. Person A has secretly put an AirTag in your backpack.</p>
      <p>A simplified pattern could look like this:</p>
      <ul>
        <li>08:10: the same AirTag is detected with you,</li>
        <li>10:00: the same AirTag is detected with you at school,</li>
        <li>16:00: the same AirTag is detected with you at work.</li>
      </ul>
      <p>The key point is that the owner is not present. You are on your own with the AirTag, and the owner is not travelling with it.</p>
      <p>On the other hand, imagine you are on a bus and you commute for 10 minutes next to a person who has a bag with an AirTag. This does not immediately trigger an unwanted tracking alert, because the owner is present and the pattern is temporary.</p>
      <p>So the important thing is whether the owner is present or absent, and whether the same AirTag keeps moving with you over time. In one sentence: it is about time and pattern matching.</p>
      <p>There is also no precise public timing published by Apple, because that information could be used by stalkers to work around the safety measures.</p>
      <p>All in all, if Apple's system becomes suspicious about an activity, you may receive a safety alert telling you that your current location can be seen by the owner of an unknown AirTag.</p>

      <h2>In a Nutshell</h2>
      <p>To summarise, AirTag is not a tiny GPS tracker. It is more like a small Bluetooth beacon that borrows the wider Apple ecosystem around it.</p>
      <p>It whispers a changing identity over Bluetooth. Nearby Apple devices can report that identity and location to Find My. Your own device can decrypt the relevant report. And when you are close enough, Ultra Wideband can help with precise distance and direction.</p>
      <p>That is what makes AirTag interesting to me. The clever part is not just the hardware. It is the way Bluetooth, nearby phones, encryption, and pattern-based safety measures work together as one system.</p>
