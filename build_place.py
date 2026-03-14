# build_place.py - Creates a Roblox place file without Rojo
# Run: python build_place.py

import os
import struct
import zlib

# Roblox place file header
PLACE_SIGNATURE = b'\x1E\x00\x00\x00'
PLACE_VERSION = 0

def create_place_file(output_path):
    """Create a basic Roblox place file with the game structure"""
    
    # This is a minimal valid rbxl file structure
    # In reality, rbxl files are complex binary formats
    # We'll create a simple XML-based rbxlx instead which is easier
    
    rbxlx_content = generate_rbxlx()
    
    with open(output_path, 'wb') as f:
        f.write(rbxlx_content.encode('utf-8'))
    
    print(f"Created: {output_path}")
    return True

def generate_rbxlx():
    """Generate RBXLX (XML format) content"""
    
    xml = '''<?xml version="1.0" encoding="UTF-8"?>
<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">
	<External>null</External>
	<External>nil</External>
	<Item class="Workspace" referent="RBX1">
		<Properties>
			<bool name="AllowThirdPartySales">false</bool>
			<CoordinateFrame name="Camera">
				<X>0</X>
				<Y>50</Y>
				<Z>100</Z>
				<R00>1</R00>
				<R01>0</R01>
				<R02>0</R02>
				<R10>0</R10>
				<R11>1</R11>
				<R12>0</R12>
				<R20>0</R20>
				<R21>0</R21>
				<R22>1</R22>
			</CoordinateFrame>
			<double name="Gravity">196.2</double>
			<string name="Name">Workspace</string>
		</Properties>
	</Item>
	<Item class="ReplicatedStorage" referent="RBX2">
		<Properties>
			<string name="Name">ReplicatedStorage</string>
		</Properties>
		<Item class="Folder" referent="RBX3">
			<Properties>
				<string name="Name">Events</string>
			</Properties>
		</Item>
	</Item>
	<Item class="ServerScriptService" referent="RBX4">
		<Properties>
			<string name="Name">ServerScriptService</string>
		</Properties>
	</Item>
	<Item class="StarterPlayer" referent="RBX5">
		<Properties>
			<string name="Name">StarterPlayer</string>
		</Properties>
		<Item class="StarterPlayerScripts" referent="RBX6">
			<Properties>
				<string name="Name">StarterPlayerScripts</string>
			</Properties>
		</Item>
	</Item>
	<Item class="StarterGui" referent="RBX7">
		<Properties>
			<string name="Name">StarterGui</string>
		</Properties>
	</Item>
</roblox>'''
    
    return xml

if __name__ == "__main__":
    output = "67-tycoon.rbxlx"
    if create_place_file(output):
        print(f"\nSuccess! Open {output} in Roblox Studio")
        print("Then manually add the scripts from the src/ folder")
    else:
        print("Failed to create place file")
